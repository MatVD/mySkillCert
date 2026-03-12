const esbuild = require("esbuild");
const terser = require("terser");
const fs = require("fs");
const csso = require("csso");
const crypto = require("crypto");

function fileHash(content) {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 8);
}

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

    // Inject content-based version hashes into HTML
    const jsHash = fileHash(minified.code);
    const cssHash = fileHash(minCss);
    let html = fs.readFileSync("myskillcert.html", "utf8");
    html = html.replace(
      /myskillcert\.min\.js\?v=[^"']+/,
      `myskillcert.min.js?v=${jsHash}`,
    );
    html = html.replace(
      /myskillcert\.min\.css\?v=[^"']+/,
      `myskillcert.min.css?v=${cssHash}`,
    );
    fs.writeFileSync("myskillcert.html", html, "utf8");
    console.log(`Cache-bust hashes injected — JS: ${jsHash}, CSS: ${cssHash}`);

    console.log("Build complete.");
    process.exit(0);
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
})();
