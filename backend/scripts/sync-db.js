import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  console.log("🚀 Syncing SQLite database (Shell-less mode)...");

  // Find npx path carefully (it's usually in the same dir as node)
  const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";

  const result = spawnSync(npxCmd, ["prisma", "db", "push"], {
    cwd: path.join(__dirname, ".."), // backend root
    stdio: "inherit",
    shell: true, // Try shell:true with quoted args first, if that fails, we'll try something else
  });

  if (result.status === 0) {
    console.log("✅ Database synced successfully!");
  } else {
    throw new Error(`Process exited with code ${result.status}`);
  }
} catch (error) {
  console.error("❌ Sync failed:", error.message);
  process.exit(1);
}
