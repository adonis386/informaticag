import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { buildAnalyticsHead } from './src/config/analytics';
import { buildSeoHead, buildSeoNoscript } from './src/config/seo';

export default defineConfig({
  appType: 'spa',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    {
      name: 'inject-seo',
      transformIndexHtml(html) {
        return html
          .replace('<!-- SEO_INJECT -->', `${buildSeoHead()}\n    ${buildAnalyticsHead()}`)
          .replace('<!-- SEO_NOSCRIPT -->', buildSeoNoscript());
      },
    },
  ],
});
