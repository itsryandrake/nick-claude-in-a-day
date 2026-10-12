# Nick's Claude in a Day recap

A responsive, one-page workshop recap built with Vite, React and TypeScript. It is fully static and has no backend.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`.

## Quality checks

```bash
npm run typecheck
npm test
npm run build
npm run qa
```

`npm run qa` starts the production preview automatically, checks desktop and 390px mobile layouts, tests the interactive architecture, scans serious and critical axe accessibility issues, verifies reduced motion, and writes screenshots to `.impeccable/review/`.

## Deployment overview

The built site is the `dist/` directory produced by `npm run build`. For a future Vercel deployment:

1. Put the local repository on GitHub.
2. Import the GitHub repository into Vercel.
3. Use build command `npm run build` and output directory `dist`.
4. Point the GoDaddy domain's DNS records to the Vercel domain configuration.

GitHub normally triggers Vercel deployments. GoDaddy provides the domain and DNS. Claude Code edits the local repository and commits source to GitHub. It is not a hosting connection.

This project intentionally has no remote repository and has not been published, pushed or deployed.
