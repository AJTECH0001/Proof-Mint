import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      global: true, // Polyfill global to fix "global is not defined"
      buffer: true, // Polyfill Buffer if needed by Stellar Wallet Kit
      process: true, // Polyfill process if needed
    }),
  ],
  server: {
    fs: {
      // Restrict file access to prevent server.fs.deny bypass vulnerabilities
      deny: [
        '.env',
        '.env.*',
        '*.pem',
        '*.key',
        '*.cert',
        'package.json',
        'package-lock.json',
        'node_modules',
        '.git',
      ],
    },
  },
});