// Build-time only: ssrLoadModule the JSX renderer so it can import the design system's .jsx sources untouched.
// The design system has no package.json of its own, so React is also a root devDependency: Node resolves it from the workspace root.
import path from 'node:path';
export default {
  appType: 'custom',
  esbuild: { jsx: 'automatic', jsxDev: false },
  resolve: {
    alias: { '@carry-ds': path.resolve(import.meta.dirname, '../carry-ds') },
    dedupe: ['react', 'react-dom'],
  },
  server: { middlewareMode: true, hmr: false, fs: { allow: [path.resolve(import.meta.dirname, '..')] } },
  optimizeDeps: { noDiscovery: true },
  logLevel: 'warn',
};
