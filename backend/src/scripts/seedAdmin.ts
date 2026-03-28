import { prisma } from "../lib/prisma.js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

async function seedAdmin() {
  try {
    console.log("*** Admin Seeding Started...");
    const adminData = {
      name: requireEnv("ADMIN_NAME"),
      email: requireEnv("ADMIN_EMAIL"),
      role: requireEnv("ADMIN_ROLE"),
      password: requireEnv("ADMIN_PASSWORD"),
    };

    await prisma.$connect();

    console.log("*** Checking Admin exists or not...");

    // check user exists on db or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email!,
      },
    });
    console.log(existingUser);
    if (existingUser) {
      throw new Error("User already exists!!");
    }

    const signUpAdmin = await fetch(
      `http://localhost:${requireEnv("PORT")}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: `${requireEnv("PORT")}`,
        },
        body: JSON.stringify(adminData),
      },
    );
    console.log(signUpAdmin);
    if (signUpAdmin.ok) {
      console.log("*****Admin Created");
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("***** Email verification status updated");
    } else throw new Error();
    console.log(`*********** Success *********`);
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
