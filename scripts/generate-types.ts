import { execSync } from "node:child_process";

console.log("📝 Generating Types");

try {
  execSync("tsc --project tsconfig.build.json", {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  console.log("✅ Types generated successfully");
} catch (error) {
  console.error("❌ Failed to generate types:", error);
  process.exit(1);
}
