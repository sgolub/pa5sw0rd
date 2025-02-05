import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({ include: ['src/**/*.ts', 'src/**/*.dts'], rollupTypes: true }),
    react({ include: ['demo/**/*.tsx'] })
  ],
  build: {
    lib: {
      name: 'Pa5sW0rd',
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'pa5sw0rd'
    },
    copyPublicDir: false
  },
  server: {
    open: '/demo/index.html'
  }
});
