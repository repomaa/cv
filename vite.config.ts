import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env file based on mode, with '' prefix to load all vars (not just VITE_*)
  const env = loadEnv(mode, process.cwd(), '');

  // Merge into process.env for server-side code access
  process.env = { ...process.env, ...env };

  return {
    plugins: [tailwindcss(), sveltekit()],
    css: {
      transformer: 'lightningcss',
    },
    build: {
      target: 'esnext',
    },
  };
});
