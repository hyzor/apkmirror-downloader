import { APKMirrorDownloader } from "./lib/index";
import { getVariants } from "./lib/scrapers/variants";
import { isBetaVersion } from "./lib/utils";

const TEMP_DIR = "./temp";

getVariants(
  "https://www.apkmirror.com/apk/x-corp/twitter/x-11-59-0-release-0-release/",
).then(console.log);

const apkmd = new APKMirrorDownloader({ outDir: TEMP_DIR });

// Test the fix with specific version strings
apkmd
  .download(
    { org: "x-corp", repo: "twitter" },
    { version: "latest", type: "bundle", dpi: "*" },
  )
  .then(console.log);

// Test specific version that was failing before - now should work
apkmd
  .download(
    { org: "x-corp", repo: "twitter" },
    { version: "11.58.0-release.0", type: "bundle", dpi: "*" },
  )
  .then(console.log);

// Test getting versions for x-corp/twitter
APKMirrorDownloader.getVersions({ org: "x-corp", repo: "twitter" }).then(
  versions => {
    console.log("Available versions for x-corp/twitter:");
    versions.forEach((version, index) => {
      console.log(`${index + 1}. ${version.name}`);
    });

    const nonBeta = versions.filter(version => !isBetaVersion(version));
    console.log("Versions without beta releases:");
    nonBeta.forEach((version, index) => {
      console.log(`${index + 1}. ${version.name}`);
    });
  },
);
