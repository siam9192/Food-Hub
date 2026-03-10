import { DietaryType } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { categoryService } from "../modules/category/category.service";

const rawCategories = [
  "Traditional Cuisine",
  "Rice Dishes",
  "Beef Dishes",
  "Desserts",
  "Fast Food",
  "Snacks & Appetizers",
  "Salads",
  "Healthy",
  "Seafood",
  "Chicken Dishes",
  "Curry Dishes",
  "Breakfast Items",
  "Sweets & Bakery",
  "Tea & Coffee",
];

const rawData = [
  // --- DHAKA DINER ---
  {
    name: "Platter for Two",
    price: 950,
    provider: "Dhaka Diner",
    cat: "Traditional Cuisine",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1544124499-58912cbddaad",
  },
  {
    name: "Beef Rezala",
    price: 380,
    provider: "Dhaka Diner",
    cat: "Beef Dishes",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  },

  // --- SULTAN'S SPICE ---
  {
    name: "Mutton Kacchi Biryani",
    price: 480,
    provider: "Sultan's Spice",
    cat: "Rice Dishes",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
  },
  {
    name: "Shahi Tukda",
    price: 180,
    provider: "Sultan's Spice",
    cat: "Desserts",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1589112106431-72412b1846b0",
  },

  // --- THE BURGER GARAGE ---
  {
    name: "Naga Blast Burger",
    price: 290,
    provider: "The Burger Garage",
    cat: "Fast Food",
    diet: DietaryType.NONE,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    name: "Classic Cheese Slider",
    price: 150,
    provider: "The Burger Garage",
    cat: "Fast Food",
    diet: DietaryType.NONE,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },

  // --- PIZZA PORT ---
  {
    name: "Pepperoni Feast Pizza",
    price: 850,
    provider: "Pizza Port",
    cat: "Fast Food",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
  },
  {
    name: "Garlic Bread Sticks",
    price: 220,
    provider: "Pizza Port",
    cat: "Snacks & Appetizers",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c",
  },

  // --- GREEN LEAF SALADS ---
  {
    name: "Greek Salad",
    price: 320,
    provider: "Green Leaf Salads",
    cat: "Salads",
    diet: DietaryType.VEGAN,
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
  },
  {
    name: "Quinoa Power Bowl",
    price: 450,
    provider: "Green Leaf Salads",
    cat: "Healthy",
    diet: DietaryType.VEGAN,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  },

  // --- CHITTAGONG MEZBAN HOUSE ---
  {
    name: "Beef Kala Bhuna",
    price: 450,
    provider: "Chittagong Mezban House",
    cat: "Beef Dishes",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1541544741938-0af808871cc0",
  },
  {
    name: "Mezbani Daal",
    price: 180,
    provider: "Chittagong Mezban House",
    cat: "Traditional Cuisine",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
  },

  // --- SUSHI ZEN ---
  {
    name: "Salmon Nigiri",
    price: 550,
    provider: "Sushi Zen",
    cat: "Seafood",
    diet: DietaryType.NONE,
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
  },
  {
    name: "Vegetable Tempura",
    price: 320,
    provider: "Sushi Zen",
    cat: "Snacks & Appetizers",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c",
  },

  // --- TANDOORI NIGHTS ---
  {
    name: "Tandoori Chicken (Half)",
    price: 380,
    provider: "Tandoori Nights",
    cat: "Chicken Dishes",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f",
  },
  {
    name: "Butter Naan",
    price: 60,
    provider: "Tandoori Nights",
    cat: "Traditional Cuisine",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1533777324545-e01693532420",
  },

  // --- PASTA PASSION ---
  {
    name: "Beef Lasagna",
    price: 450,
    provider: "Pasta Passion",
    cat: "Curry Dishes",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1619895092538-1283417871fa",
  },
  {
    name: "Fettuccine Alfredo",
    price: 380,
    provider: "Pasta Passion",
    cat: "Traditional Cuisine",
    diet: DietaryType.NONE,
    img: "https://images.unsplash.com/photo-1645112481338-35624dc238a2",
  },

  // --- WOK & ROLL ---
  {
    name: "Mixed Chowmein",
    price: 320,
    provider: "Wok & Roll",
    cat: "Traditional Cuisine",
    diet: DietaryType.NONE,
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  },
  {
    name: "Thai Green Curry",
    price: 420,
    provider: "Wok & Roll",
    cat: "Curry Dishes",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
  },

  // --- THE BREAKFAST CLUB ---
  {
    name: "Blueberry Pancakes",
    price: 320,
    provider: "The Breakfast Club",
    cat: "Breakfast Items",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
  },
  {
    name: "English Breakfast Platter",
    price: 550,
    provider: "The Breakfast Club",
    cat: "Breakfast Items",
    diet: DietaryType.NONE,
    img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
  },

  // --- DESSERT HEAVEN ---
  {
    name: "Chocolate Tsunami Cake",
    price: 280,
    provider: "Dessert Heaven",
    cat: "Desserts",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    name: "Red Velvet Slice",
    price: 220,
    provider: "Dessert Heaven",
    cat: "Sweets & Bakery",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f",
  },

  // --- CAFE MOCHA ---
  {
    name: "Iced Caramel Latte",
    price: 250,
    provider: "Cafe Mocha",
    cat: "Tea & Coffee",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
  },
  {
    name: "Tiramisu Cup",
    price: 320,
    provider: "Cafe Mocha",
    cat: "Desserts",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
  },

  // --- STEAK & CO. ---
  {
    name: "Ribeye Steak",
    price: 1250,
    provider: "Steak & Co.",
    cat: "Beef Dishes",
    diet: DietaryType.NONE,
    img: "https://images.unsplash.com/photo-1546241072-48010ad2862c",
  },
  {
    name: "Mashed Potatoes",
    price: 180,
    provider: "Steak & Co.",
    cat: "Snacks & Appetizers",
    diet: DietaryType.VEGETARIAN,
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
  },

  // --- BIRYANI EXPRESS ---
  {
    name: "Beef Tehari",
    price: 320,
    provider: "Biryani Express",
    cat: "Rice Dishes",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  },
  {
    name: "Chicken Polao",
    price: 280,
    provider: "Biryani Express",
    cat: "Rice Dishes",
    diet: DietaryType.HALAL,
    img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
  },
];

async function main() {
  console.log("🚀 Starting database seed...");

  try {
    // Clean existing data
    console.log("🧹 Cleaning existing meals and categories...");
    await prisma.$transaction([
      prisma.meal.deleteMany(),
      prisma.category.deleteMany(),
    ]);

    // Create categories
    console.log(" Creating categories...");
    await Promise.all(
      rawCategories.map((name) => categoryService.createCategory({ name })),
    );

    console.log(" Categories created");

    // Fetch providers and categories
    console.log(" Fetching providers and categories...");
    const providers = await prisma.providerProfile.findMany({
      include: { user: true },
    });
    const categories = await prisma.category.findMany();

    // Create lookup maps (faster than .find)
    const providerMap = new Map(providers.map((p) => [p.user.name, p.id]));

    const categoryMap = new Map(categories.map((c) => [c.name, c.id]));

    // Transform raw data
    const meals = rawData
      .map((item) => {
        const providerId = providerMap.get(item.provider);
        const categoryId = categoryMap.get(item.cat);

        if (!providerId || !categoryId) {
          console.warn(
            ` Skipping "${item.name}" → Provider or Category not found`,
          );
          return null;
        }

        return {
          name: item.name,
          description: `Delicious ${item.name} served fresh at ${item.provider}.`,
          price: item.price,
          imageUrl: `${item.img}?q=80&w=1200`,
          providerId,
          categoryId,
          dietaryType: item.diet,
          isAvailable: true,
        };
      })
      .filter((meal): meal is NonNullable<typeof meal> => meal !== null);

    console.log(` Preparing to insert ${meals.length} meals...`);

    // Insert meals
    await prisma.meal.createMany({
      data: meals,
      skipDuplicates: true,
    });

    console.log(` Success! Seeded ${meals.length} meals.`);
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
