import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config.js";
import { PrismaClient } from "../prisma-output/client.js";
import { UserRole } from "../prisma-output/enums.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

const basePrisma = new PrismaClient({ adapter });

export const prisma = basePrisma.$extends({
  query: {
    user: {
      create: async ({ args, query }:any) => {
        const user = await query(args);

        // Auto-create ProviderProfile
        if (user.role === UserRole.PROVIDER) {
          const existingProfile = await basePrisma.providerProfile.findUnique({
            where: { userId: user.id as string },
          });

          if (!existingProfile) {
            await basePrisma.providerProfile.create({
              data: {
                userId: user.id as string,
                restaurantName: "",
                address: "",
                phone: "",
                isOpen: true,
              },
            });
          }
        }

        return user;
      },
    },
  },
});
