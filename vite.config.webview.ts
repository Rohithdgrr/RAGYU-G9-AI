import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'webview',
  build: {
    outDir: '../out/webview',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'webview', 'index.html')
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '../components': path.resolve(__dirname, 'components'),
      '../services': path.resolve(__dirname, 'services'),
      '../types': path.resolve(__dirname, 'types.ts')
    }
  }
});
