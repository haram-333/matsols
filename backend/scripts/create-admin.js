import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@matsols.com";
  const password = "password123";
  const role = "ADMIN";

  console.log(`🚀 Creating default admin user: ${email}...`);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword, role },
      create: {
        email,
        password: hashedPassword,
        role,
      },
    });

    console.log("✅ Admin user created successfully!");
    console.log(`📧 Email: ${email}`);
    console.log("🔑 Password: password123");
  } catch (error) {
    console.error("❌ Failed to create admin user:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
