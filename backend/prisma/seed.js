import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { degreesData, initialUpdates } from "./seed-data.js";
import bcrypt from "bcryptjs";

const dbUrl = process.env.DATABASE_URL;
if (
  !dbUrl ||
  (!dbUrl.startsWith("postgresql://") && !dbUrl.startsWith("postgres://"))
) {
  console.error(
    "❌ ERROR: DATABASE_URL must start with 'postgresql://' or 'postgres://'",
  );
  console.error(
    "Current DATABASE_URL:",
    dbUrl ? dbUrl.substring(0, 20) + "..." : "undefined",
  );
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  // --- Create Admin User ---
  console.log("\n🚀 Creating Admin User...");
  const adminEmail = "admin@matsols.com";
  const adminPassword = "admin123";
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedAdminPassword,
      role: "ADMIN",
      fullName: "System Admin",
    },
    create: {
      email: adminEmail,
      password: hashedAdminPassword,
      role: "ADMIN",
      fullName: "System Admin",
    },
  });
  console.log("✅ Admin user created/updated.");

  console.log("🚀 Starting bulk migration from seed-data.js...");
  console.log(`📊 Found ${degreesData.length} entries to migrate.`);

  for (const degree of degreesData) {
    try {
      // Clean and prepare the object for Prisma (matching the schema exactly)
      const data = {
        name: degree.name,
        code: degree.code || null,
        about: degree.about || null,
        keyInformation: degree.keyInformation || null,
        overview: degree.overview || null,
        structure: degree.structure || null,
        admissionRequirements: degree.admissionRequirements || null,
        fees: degree.fees || null,
        scholarships: degree.scholarships || null,
        visaInfo: degree.visaInfo || null,
        workPermit: degree.workPermit || null,
        tuitionFee: degree.tuitionFee || null,
        duration: degree.duration || null,
        applyDate: degree.applyDate || null,
        intake: degree.intake || null,
        campusLocation: degree.campusLocation || null,
        taughtIn: degree.taughtIn || null,
        universityAffiliation: degree.universityAffiliation || null,
        progression: degree.progression || null,
        faqs: degree.faqs || null,
        slug: degree.slug,
        level: degree.level || null,
      };

      await prisma.degree.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      });
      process.stdout.write(`✅ [${data.level}] ${data.slug}\n`);
    } catch (err) {
      console.error(`\n❌ Failed to migrate ${degree.slug}:`, err.message);
    }
  }

  // --- Migrate Updates ---
  console.log("\n🚀 Starting migration of Updates & Insights...");

  // initialUpdates is an object with { hero: [], grid: [] }
  const allUpdates = [
    ...initialUpdates.hero.map((u) => ({ ...u, category: "hero" })),
    ...initialUpdates.grid.map((u) => ({ ...u, category: "grid" })),
  ];

  for (const update of allUpdates) {
    try {
      const data = {
        title: update.title,
        category: update.category,
        date: update.date || update.cta || "Today",
        excerpt: update.desc || update.subtitle || "",
        image: update.image || null,
      };

      await prisma.update.create({
        data,
      });
      process.stdout.write(
        `✅ [${data.category}] ${data.title.substring(0, 20)}...\n`,
      );
    } catch (err) {
      console.error(
        `\n❌ Failed to migrate update ${update.title}:`,
        err.message,
      );
    }
  }

  console.log(
    "\n✨ All data migrated! Your SQL database is now fully populated.",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
