import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3001,
  },
  define: {
    global: 'globalThis',
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
