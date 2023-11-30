import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    minify: 'terser',
    chunkSizeWarningLimit: 500,
    cssMinify: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'assets/index.js',
        manualChunks: undefined,
      },
    },
  },
});
