/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './rtlvite.setup.ts',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
})
