// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Deployed to GitHub Pages as a project page, so the site lives under a sub-path.
// Both are overridable from the environment for a custom domain or a fork.
const site = process.env.SITE ?? 'https://kostyngricuk.github.io';
const base = process.env.BASE_PATH ?? '/fai-promo-website';

// Static site: one page, rendered at build time, hydrated by React islands.
export default defineConfig({
  site,
  base,
  integrations: [react()],
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  vite: {
    // ogl ships untranspiled ESM; keep it out of the optimizer's CJS interop path.
    ssr: { noExternal: ['ogl'] }
  }
});
