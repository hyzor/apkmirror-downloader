import { execSync } from "node:child_process";

console.log("🏗️  Building Lib");
await Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "dist",
  target: "node",
  sourcemap: "external",
  // @ts-ignore
  packages: "external",
  minify: true,
});

console.log("🏗️  Building CLI");
await Bun.build({
  entrypoints: ["src/cli.ts"],
  outdir: "dist",
  target: "node",
  sourcemap: "none",
  minify: true,
});

console.log("📝 Generating Types");
try {
  execSync("bun scripts/generate-types.ts", {
    stdio: "inherit",
    cwd: process.cwd(),
  });
} catch (error) {
  console.error("❌ Failed to generate types:", error);
  process.exit(1);
}
