// Dependency policy — the design system is the UI library. No UI, CSS, icon or animation packages.
// Tooling (bundler, test runner, types, schema validation, Playwright for export) is allowed.
// Adding anything outside the allowlist needs a docs/decisions entry; the entry id goes in the map below.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ALLOW = new Map([
  ['react', 'runtime for packages/carry-ds .jsx sources'],
  ['react-dom', 'runtime for packages/carry-ds .jsx sources'],
  ['typescript', 'tooling'], ['vite', 'tooling'], ['@vitejs/plugin-react', 'tooling'],
  ['@types/react', 'types'], ['@types/react-dom', 'types'], ['@types/node', 'types'],
  ['vitest', 'test runner'], ['zod', 'content schema validation (task 3)'],
  ['@playwright/test', 'export and mobile check (tasks 5, 6)'], ['playwright', 'export and mobile check (tasks 5, 6)'],
]);
const DENY = [/^@mui\//, /^@material-ui/, /^antd$/, /^@ant-design/, /^@chakra-ui/, /^bootstrap$/, /^react-bootstrap$/, /tailwind/, /^daisyui$/, /shadcn/, /^@radix-ui/, /^@headlessui/, /^@emotion/, /^styled-components$/, /^framer-motion$/, /^motion$/, /^gsap$/, /^animejs$/, /^lottie/, /icons?$/i, /^@fortawesome/, /^lucide/];

const manifests = [path.join(root, 'package.json')];
for (const dir of readdirSync(path.join(root, 'packages'))) {
  const p = path.join(root, 'packages', dir, 'package.json');
  if (existsSync(p)) manifests.push(p);
}
const fails = [], warns = [];
for (const m of manifests) {
  const pkg = JSON.parse(readFileSync(m, 'utf8'));
  const rel = path.relative(root, m);
  for (const field of ['dependencies', 'devDependencies', 'peerDependencies']) {
    for (const name of Object.keys(pkg[field] || {})) {
      if (name.startsWith('carry-')) continue; // workspace packages
      if (DENY.some((re) => re.test(name))) fails.push(`${rel}: ${name} is a UI/CSS/animation library — the design system is the UI library`);
      else if (!ALLOW.has(name)) warns.push(`${rel}: ${name} is not on the allowlist — record it in docs/decisions and add it to scripts/check-deps.mjs`);
    }
  }
}
warns.forEach((w) => console.log('WARN  ' + w));
fails.forEach((f) => console.log('FAIL  ' + f));
console.log(`check-deps: ${manifests.length} manifests, ${fails.length} failure(s), ${warns.length} warning(s)`);
process.exit(fails.length ? 1 : 0);
