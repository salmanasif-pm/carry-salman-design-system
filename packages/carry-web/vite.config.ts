import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// The design system lives one package over; Vite must be allowed to serve and transpile it.
const ds = fileURLToPath(new URL('../carry-ds', import.meta.url));

export default defineConfig({
  plugins: [react({ include: /\.(jsx|tsx)$/ })],
  resolve: { alias: { '@carry-ds': ds } },
  server: { fs: { allow: ['..', ds] } },
  build: { outDir: 'dist', emptyOutDir: true },
});
