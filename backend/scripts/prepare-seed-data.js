import fs from "fs";
import path from "path";

// Helper to read file as text and extract exported object
function extractExport(filePath, exportName) {
  const content = fs.readFileSync(filePath, "utf8");
  // Very basic extraction: find the start of the export and match braces
  // This is a hack, but should work for our specific files
  const regex = new RegExp(`export const ${exportName} = ([\\s\\S]+);`);
  const match = content.match(regex);
  if (!match) return null;

  let jsonString = match[1].trim();
  // Remove image imports which are not valid JSON
  jsonString = jsonString.replace(/image: \w+,/g, "image: null,");

  // Try to evaluate it safely or just use it as a string
  // For degreesData, it's a huge array. We'll try to parse it if possible,
  // but it's easier to just strip the 'export' part and use it.
  return jsonString;
}

const degrees = extractExport("../src/data/degreesData.js", "degreesData");
const updates = extractExport("../src/data/updatesData.js", "initialUpdates");

if (degrees && updates) {
  const finalContent = `export const degreesData = ${degrees};\nexport const initialUpdates = ${updates};`;
  fs.writeFileSync("./prisma/seed-data.js", finalContent);
  console.log("✅ Seed data prepared successfully (assets mocked).");
} else {
  console.error("❌ Failed to extract seed data.");
  process.exit(1);
}
