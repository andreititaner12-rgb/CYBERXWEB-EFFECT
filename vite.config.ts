import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isSandbox = Boolean(process.env.E2B_SANDBOX || process.env.E2B_SANDBOX_ID);

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    cssMinify: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          lucide: ['lucide-react'],
          three: ['three'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: true,
    hmr: isSandbox ? { clientPort: 443 } : true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    cors: true,
    allowedHosts: true,
  },
});
