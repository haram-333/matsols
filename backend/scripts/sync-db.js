import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  console.log("🚀 Syncing Database with Neon (Cloud)...");

  const backendDir = path.join(__dirname, "..");

  // Find the exact prisma binary to avoid npx/shell path issues with spaces
  const prismaBin = path.join(backendDir, "node_modules", ".bin", "prisma.cmd");

  if (!fs.existsSync(prismaBin)) {
    throw new Error(
      "Prisma binary not found in node_modules. Please run npm install.",
    );
  }

  // Wrap the path in quotes for Windows
  const command = `"${prismaBin}" db push`;

  execSync(command, {
    cwd: backendDir,
    stdio: "inherit",
    shell: true,
  });

  console.log("✅ Database synchronized successfully!");
} catch (error) {
  console.error("❌ Sync failed:", error.message);
  process.exit(1);
}
