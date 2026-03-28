import { OrderStatus } from "../../prisma-output/enums.js";
import { prisma } from "../../lib/prisma.js";
const generateFakeProgress = () => {
    const isDown = Math.random() < 0.5;
    const step = Math.round(Math.random() * 30);
    return isDown ? -step : step;
};
async function getAllSummariesForProvider(authUser) {
    const totalRevenue = await prisma.order.groupBy({
        by: "id",
        where: {
            status: OrderStatus.DELIVERED,
            provider: {
                userId: authUser.id,
            },
        },
        _sum: {
            totalPrice: true,
        },
    });
    const totalCustomers = await prisma.order.groupBy({
        by: "customerId",
        where: {
            provider: {
                userId: authUser.id,
            },
        },
        _count: true,
    });
    const activeOrders = await prisma.order.groupBy({
        by: "id",
        where: {
            provider: {
                userId: authUser.id,
            },
            status: {
                notIn: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
            },
        },
        _count: true,
    });
    const avgRating = await prisma.review.groupBy({
        by: "id",
        where: {
            order: {
                provider: {
                    userId: authUser.id,
                },
            },
        },
        _avg: {
            rating: true,
        },
    });
    const result = {
        totalRevenue: {
            value: totalRevenue[0]?._sum.totalPrice,
            progress: generateFakeProgress(),
        },
        totalCustomers: {
            value: totalCustomers[0]?._count,
            progress: generateFakeProgress(),
        },
        activeOrders: {
            value: activeOrders[0]?._count,
            progress: generateFakeProgress(),
        },
        avgRating: {
            value: avgRating[0]?._avg.rating,
            progress: generateFakeProgress(),
        },
    };
    return result;
}
export const metaService = {
    getAllSummariesForProvider,
};
