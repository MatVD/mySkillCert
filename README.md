# MySkillCert — build notes

Small project with static assets. Recommended build steps to produce minified assets locally:

1. Install dev dependencies:

```bash
npm install
```

2. Build minified JS and CSS:

```bash
npm run build
```

This uses `terser` to minify `myskillcert.js` into `myskillcert.min.js` and `clean-css-cli` to produce `myskillcert.min.css`.

Deploy as static files (Vercel will serve them). `vercel.json` already sets Cache-Control headers for `.css` and `.js` files.
