import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AuthUser } from "../../types/utils.type";

const generateFakeProgress = (): number => {
  const isDown = Math.random() < 0.5;
  const step = Math.round(Math.random() * 30);
  return isDown ? -step : step;
};

async function getAllSummariesForProvider(authUser: AuthUser) {
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

  const avgRatting = await prisma.review.groupBy({
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
      value: totalRevenue[0]?._sum,
      progress: generateFakeProgress(),
    },
    totalCustomers: {
      value: {
        value: totalCustomers[0]?._count,
        progress: generateFakeProgress(),
      },
    },
    activeOrders: {
      value: {
        value: activeOrders[0]?._count,
        progress: generateFakeProgress(),
      },
    },
    avgRatting: {
      value: {
        value: avgRatting[0]?._avg,
        progress: generateFakeProgress(),
      },
    },
  };

  return result;
}

export const metaService = {
  getAllSummariesForProvider,
};
