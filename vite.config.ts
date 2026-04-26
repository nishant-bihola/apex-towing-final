import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.VITE_NOTION_TOKEN': JSON.stringify(env.VITE_NOTION_TOKEN),
      'process.env.VITE_NOTION_DATABASE_ID': JSON.stringify(env.VITE_NOTION_DATABASE_ID),
      'process.env.VITE_RESEND_API_KEY': JSON.stringify(env.VITE_RESEND_API_KEY),
      'global': 'window',
      'process.env': {},
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'process': 'process/browser',
        'buffer': 'buffer',
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: (typeof process !== 'undefined' ? process.env.DISABLE_HMR : 'false') !== 'true',
    },
  };
});
