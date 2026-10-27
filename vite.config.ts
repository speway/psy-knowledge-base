import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('reader-sources')) {
            return 'data-reader-sources';
          }
          if (id.includes('faculty')) {
            return 'data-faculty';
          }
          if (id.includes('glossary')) {
            return 'data-glossary';
          }
          if (id.includes('understanding-cards') || id.includes('contextual-guides')) {
            return 'data-pedagogy';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
        }
      }
    }
  }
});
