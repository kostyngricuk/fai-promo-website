// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Static site: one page, rendered at build time, hydrated by React islands.
export default defineConfig({
  integrations: [react()],
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  vite: {
    // ogl ships untranspiled ESM; keep it out of the optimizer's CJS interop path.
    ssr: { noExternal: ['ogl'] }
  }
});
