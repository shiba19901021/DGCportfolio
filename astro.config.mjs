import { defineConfig } from 'astro/config';
import previewMedia from './scripts/preview-media.mjs';

export default defineConfig({
  output: 'static',
  site: 'https://shiba19901021.github.io',
  base: process.env.PORTFOLIO_BASE || '/DGCportfolio',
  trailingSlash: 'always',
  integrations: [previewMedia()],
  server: { host: '127.0.0.1', port: 4321 },
  vite: { server: { fs: { strict: true } } },
});
