import { OrderStatus } from "../../prisma-output/enums.js";
import { orderConfirmationEmail } from "../../emails/orderConfirmation.js";
import { AppError } from "../../errors/AppError.js";
import { transporter } from "../../lib/mailer.js";
import { prisma } from "../../lib/prisma.js";
import { getIo } from "../../socket/init.js";
import { getUsersByIds } from "../../socket/store-connections.js";
const createOrder = async (userId, payload) => {
    if (!payload.items || payload.items.length === 0) {
        throw new AppError(400, "Order must contain at least one item");
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError(401, "User not found");
    }
    const meals = await prisma.meal.findMany({
        where: {
            id: { in: payload.items.map((i) => i.mealId) },
            isAvailable: true,
            provider: {
                isOpen: true,
                user: { status: "ACTIVE" },
            },
        },
        include: {
            provider: true,
        },
    });
    const providerId = meals[0].providerId;
    const uniqueProviders = new Set(meals.map((m) => m.providerId));
    if (uniqueProviders.size > 1) {
        throw new AppError(400, "Meals must be from a single provider");
    }
    const orderItemsData = payload.items.map((item) => {
        const meal = meals.find((m) => m.id === item.mealId);
        return {
            mealId: meal.id,
            mealName: meal.name,
            mealPrice: meal.price,
            quantity: item.quantity,
        };
    });
    const totalPrice = orderItemsData.reduce((sum, item) => sum + item.mealPrice * item.quantity, 0);
    const order = await prisma.order.create({
        data: {
            customerId: user.id,
            providerId,
            deliveryAddress: payload.deliveryAddress,
            status: OrderStatus.PLACED,
            totalPrice,
            items: {
                create: orderItemsData,
            },
        },
        include: {
            items: true,
        },
    });
    // Send email safely
    if (user.email) {
        await transporter.sendMail(orderConfirmationEmail({
            email: user.email,
            orderId: order.id,
            totalPrice: order.totalPrice,
            address: order.deliveryAddress,
        }));
    }
    const io = getIo();
    if (io) {
        //  Collect provider user IDs and count orders per provider
        const providerOrdersCount = new Map();
        for (const meal of meals) {
            const id = meal.provider.userId;
            providerOrdersCount.set(id, (providerOrdersCount.get(id) || 0) + 1);
        }
        // Get unique provider IDs
        const providerUniqueIds = Array.from(providerOrdersCount.keys());
        // Collect all active connections for these providers
        const allConnections = [];
        for (const id of providerUniqueIds) {
            const connections = getUsersByIds(id);
            if (connections.length) {
                allConnections.push(...connections);
            }
        }
        //  Emit notifications
        allConnections.forEach((connection) => {
            const orderCount = providerOrdersCount.get(connection.id);
            if (orderCount && orderCount > 0) {
                io.to(connection.socketId).emit("order:placed", {
                    message: `You have received ${orderCount} new order${orderCount > 1 ? "s" : ""}`,
                });
            }
        });
    }
    return order;
};
const getMyOrders = async (userId) => {
    if (!userId) {
        throw new AppError(401, "Unauthorized access");
    }
    return prisma.order.findMany({
        where: {
            customerId: userId,
        },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
            review: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getSingleOrder = async (userId, orderId) => {
    if (!orderId) {
        throw new AppError(400, "Order ID is required");
    }
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            customerId: userId,
        },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
            provider: true,
        },
    });
    if (!order) {
        throw new AppError(404, "Order not found");
    }
    return order;
};
const cancelOrder = async (customer, orderId) => {
    if (!orderId) {
        throw new AppError(400, "Order ID is required");
    }
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            customerId: customer.id,
        },
        include: {
            provider: {
                select: {
                    userId: true,
                },
            },
        },
    });
    if (!order) {
        throw new AppError(404, "Order not found");
    }
    if (order.status !== OrderStatus.PLACED) {
        throw new AppError(400, "Order cannot be cancelled at this stage");
    }
    const cancelledOrder = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: OrderStatus.CANCELLED,
        },
    });
    const io = getIo();
    const providerUserId = order.provider?.userId;
    if (io && providerUserId) {
        const connections = getUsersByIds(providerUserId);
        if (connections.length) {
            const socketIds = connections.map((c) => c.socketId);
            io.to(socketIds).emit("order:canceled", {
                message: `${customer.name} has canceled their order.`,
            });
        }
    }
    return cancelledOrder;
};
// Admin
const getAllOrdersForAdmin = async () => {
    return prisma.order.findMany({
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            provider: {
                select: {
                    id: true,
                    restaurantName: true,
                },
            },
            items: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const updateOrderStatus = async (orderId, newStatus) => {
    if (!orderId) {
        throw new AppError(400, "Provider ID and Order ID are required");
    }
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
        },
    });
    if (!order) {
        throw new AppError(404, "Order not found or unauthorized");
    }
    if (order.status === newStatus) {
        throw new AppError(400, "Order status already updated");
    }
    const validTransitions = {
        PLACED: [OrderStatus.PREPARING],
        PREPARING: [OrderStatus.READY],
        READY: [OrderStatus.DELIVERED],
        DELIVERED: [],
        CANCELLED: [],
    };
    if (!validTransitions[order.status].includes(newStatus)) {
        throw new AppError(400, "Invalid order status transition");
    }
    const messages = {
        [OrderStatus.PLACED]: "Your order has been placed",
        [OrderStatus.PREPARING]: "Your order is being prepared",
        [OrderStatus.READY]: "Your order is ready for pickup/delivery",
        [OrderStatus.DELIVERED]: "Your order has been delivered",
        [OrderStatus.CANCELLED]: "Your order has been canceled",
    };
    const io = getIo();
    const customerUserId = order.customerId;
    if (io && customerUserId) {
        const connections = getUsersByIds(customerUserId);
        console.log("Connections", connections);
        if (connections.length) {
            const socketIds = connections.map((c) => c.socketId);
            io.to(socketIds).emit(`order:${newStatus.toLowerCase()}`, {
                message: messages[newStatus],
            });
        }
    }
    return prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
    });
};
const cancelOrderByAdmin = async (orderId) => {
    if (!orderId) {
        throw new AppError(400, "Order ID is required");
    }
    const cancelledOrder = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: OrderStatus.CANCELLED,
        },
    });
    const io = getIo();
    const customerUserId = cancelledOrder.customerId;
    if (io && customerUserId) {
        const connections = getUsersByIds(customerUserId);
        if (connections.length) {
            const socketIds = connections.map((c) => c.socketId);
            io.to(socketIds).emit("order:canceled", {
                message: "Your order has been canceled",
            });
        }
    }
    return cancelledOrder;
};
export const orderService = {
    createOrder,
    getMyOrders,
    getSingleOrder,
    cancelOrder,
    getAllOrdersForAdmin,
    updateOrderStatus,
    cancelOrderByAdmin,
};
