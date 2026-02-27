import { PrismaClient } from "@prisma/client";
import { degreesData } from "../../src/data/degreesData.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting bulk migration from degreesData.js...");
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
  const { initialUpdates } = await import("../../src/data/updatesData.js");

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
