import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: false,
      strict: false,
    }),
    prerender: {
      entries: ['/', '/print'],
      handleHttpError: ({ path, message }) => {
        // Ignore 404s for cv.pdf (generated after build) and static files
        if (path === '/cv.pdf' || path.startsWith('/admin/')) {
          return;
        }
        console.warn(`Prerender error for ${path}: ${message}`);
      },
      handleMissingId: () => {
        // Ignore missing IDs for hash links
        return;
      },
    },
    alias: {
      $lib: './src/lib',
    },
  },
};

export default config;
