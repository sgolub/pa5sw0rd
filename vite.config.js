import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true }), react()],
  build: {
    lib: {
      name: 'Pa5sW0rd',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es']
    },
    copyPublicDir: false
  }
});
