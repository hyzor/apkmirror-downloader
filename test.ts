import { getVariants } from "./src/lib/scrapers/variants";
import { APKMirrorDownloader } from "./src/lib/index";

getVariants("https://www.apkmirror.com/apk/x-corp/twitter/x-11-59-0-release-0-release/").then(console.log);

const apkmd = new APKMirrorDownloader({});

// Test the fix with specific version strings
apkmd.download({ org: "x-corp", repo: "twitter" }, { version: "latest", type: "bundle", dpi: "*" }).then(console.log);

// Test specific version that was failing before - now should work
apkmd.download({ org: "x-corp", repo: "twitter" }, { version: "11.58.0-release.0", type: "bundle", dpi: "*" }).then(console.log);
