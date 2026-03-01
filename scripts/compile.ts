const TARGETS = ["bun-windows-x64", "bun-linux-x64"];
const failures: string[] = [];

for (const target of TARGETS) {
  console.log(`🏗️  Compiling CLI for ${target}`);
  const outFile = target.includes("windows")
    ? "./out/apkmd.exe"
    : "./out/apkmd";
  try {
    await Bun.$`bun build --compile --target=${target} ./src/cli.ts --outfile ${outFile}`;
    console.log(`✅ Successfully compiled for ${target}`);
  } catch (error) {
    console.error(`❌ Failed to compile for ${target}`);
    failures.push(target);
  }
}

if (failures.length > 0) {
  console.log(
    `\n⚠️  Compilation completed with ${failures.length} failure(s): ${failures.join(", ")}`,
  );
  if (failures.includes("bun-linux-x64") && process.platform === "win32") {
    console.log(
      "   Note: Cross-compiling for Linux from Windows often fails due to incomplete downloads.",
    );
    console.log(
      "   Try: rm -rf ~/.bun/install/cache or use WSL/Docker to build the Linux binary.",
    );
  }
  process.exitCode = 1;
} else {
  console.log("\n✅ All targets compiled successfully!");
}
