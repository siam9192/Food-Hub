import { role } from "better-auth/plugins";
import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const providers = [
  {
    name: "Dhaka Diner",
    email: "contact@dhakadiner.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    phone: "+8801711000001",
  },
  {
    name: "Sultan's Spice",
    email: "info@sultansspice.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    phone: "+8801811000002",
  },
  {
    name: "The Burger Garage",
    email: "hello@burgergarage.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    phone: "+8801911000003",
  },
  {
    name: "Pizza Port",
    email: "orders@pizzaport.com.bd",
    password: "password123",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    phone: "+8801611000004",
  },
  {
    name: "Green Leaf Salads",
    email: "support@greenleaf.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    phone: "+8801511000005",
  },
  {
    name: "Chittagong Mezban House",
    email: "admin@mezbanhouse.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
    phone: "+8801311000006",
  },
  {
    name: "Sushi Zen",
    email: "manager@sushizen.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    phone: "+8801411000007",
  },
  {
    name: "Tandoori Nights",
    email: "chef@tandoorinights.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979",
    phone: "+8801711000008",
  },
  {
    name: "Pasta Passion",
    email: "ciao@pastapassion.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
    phone: "+8801811000009",
  },
  {
    name: "Wok & Roll",
    email: "kitchen@wokandroll.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1512058560366-cd2427ba5e73",
    phone: "+8801911000010",
  },
  {
    name: "The Breakfast Club",
    email: "morning@breakfastclub.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
    phone: "+8801611000011",
  },
  {
    name: "Dessert Heaven",
    email: "sweet@dessertheaven.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    phone: "+8801511000012",
  },
  {
    name: "Cafe Mocha",
    email: "coffee@cafemocha.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1501339817302-444d182d300b",
    phone: "+8801311000013",
  },
  {
    name: "Steak & Co.",
    email: "grill@steakandco.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1546241072-48010ad2862c",
    phone: "+8801411000014",
  },
  {
    name: "Biryani Express",
    email: "fast@biryaniexpress.com",
    password: "password123",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    phone: "+8801711000015",
  },
];
async function main() {
  console.log(" Provider seeding started...");

  const PORT = requireEnv("PORT");
  const BASE_URL = `http://localhost:${PORT}`;
  const SIGNUP_URL = `${BASE_URL}/api/auth/sign-up/email`;

  try {
    // Cleanup
    console.log(" Deleting existing providers...");
    await prisma.providerProfile.deleteMany();

    await prisma.user.deleteMany({
      where: { role: UserRole.PROVIDER },
    });

    console.log(" Existing providers removed");

    // Create providers
    for (const provider of providers) {
      const payload = {
        ...provider,
        role: UserRole.PROVIDER,
      };

      console.log(` Creating provider: ${payload.email}`);

      const res = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: BASE_URL,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMsg = "Unknown error";

        try {
          const err = await res.json();
          errorMsg = JSON.stringify(err);
        } catch {
          errorMsg = await res.text();
        }

        console.error(` Failed to create ${payload.email}:`, errorMsg);
        continue;
      }

      console.log(` Provider created: ${payload.email}`);

      // Update email verification
      await prisma.user.update({
        where: { email: payload.email },
        data: { emailVerified: true },
      });

      console.log(` Email verified: ${payload.email}`);
    }

    console.log(" Provider seeding completed!");
  } catch (error) {
    console.error(" Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
