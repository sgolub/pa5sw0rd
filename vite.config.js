import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({ include: ['src/**/*.ts', 'src/**/*.dts'] }),
    react({ include: ['demo/**/*.tsx'] })
  ],
  build: {
    rollupOptions: {
      external: ['node:crypto'],
    },
    lib: {
      name: 'Pa5sW0rd',
      entry: {
        'index': resolve(__dirname, 'src/index.ts'),
        'browser': resolve(__dirname, 'src/browser.ts'),
        'password': resolve(__dirname, 'src/password/index.ts'),
        'pin': resolve(__dirname, 'src/pin/index.ts'),
        'passphrase': resolve(__dirname, 'src/passphrase/index.ts'),
        'dictionary': resolve(__dirname, 'src/dictionary/index.ts')
      },
    },
    copyPublicDir: false,
  },
  server: {
    open: '/demo/index.html'
  }
});
