import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { buildSeoHead, buildSeoNoscript } from './src/config/seo';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-seo',
      transformIndexHtml(html) {
        return html
          .replace('<!-- SEO_INJECT -->', buildSeoHead())
          .replace('<!-- SEO_NOSCRIPT -->', buildSeoNoscript());
      },
    },
  ],
});
