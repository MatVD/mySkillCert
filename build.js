const esbuild = require("esbuild");
const terser = require("terser");
const fs = require("fs");
const csso = require("csso");

(async () => {
  try {
    console.log(
      "Minifying JS with terser (no bundling to preserve globals)...",
    );
    const src = fs.readFileSync("myskillcert.js", "utf8");
    const minified = await terser.minify(src, { compress: true, mangle: true });
    if (minified.error) throw minified.error;
    fs.writeFileSync("myskillcert.min.js", minified.code, "utf8");
    console.log("Generated myskillcert.min.js");

    console.log("Minifying CSS with csso...");
    const css = fs.readFileSync("myskillcert.css", "utf8");
    const minCss = csso.minify(css).css;
    fs.writeFileSync("myskillcert.min.css", minCss, "utf8");
    console.log("Generated myskillcert.min.css");

    // no bundle file to clean

    console.log("Build complete.");
    process.exit(0);
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
})();
