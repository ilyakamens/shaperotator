import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/shaperotator/',
  build: {
    outDir: 'docs',
    target: 'esnext',
  },
  server: {
    port: 3000,
  },
});
