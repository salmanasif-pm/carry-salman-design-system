// Carry release gate — wraps packages/carry-ds/scripts/release-check.js --public.
// The wrapped script no-ops silently when it is parsed as an ES module (its browser guard sees
// `require` undefined). This gate runs it from the workspace root, whose package.json has no
// "type" field, and refuses to pass unless the report header and the final "clean" line appear.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(root, 'packages/carry-ds/scripts/release-check.js');
const problems = [];

for (const rel of ['uploads', 'strategy', 'github.md', 'packages/carry-ds/uploads', 'packages/carry-ds/strategy', 'packages/carry-ds/github.md']) {
  if (existsSync(path.join(root, rel))) problems.push(`restricted path present in the repository: ${rel}`);
}
if (!existsSync(script)) problems.push(`missing ${path.relative(root, script)}`);

let out = '';
if (problems.length === 0) {
  const r = spawnSync(process.execPath, [script, '--public'], { cwd: root, encoding: 'utf8' });
  out = (r.stdout || '') + (r.stderr || '');
  const header = out.match(/^Carry release check — (\d+) files \(public build\)/m);
  if (!header) problems.push('release-check.js printed no report: it ran as a no-op (ESM scope or wrong runtime), which is not a pass');
  else if (Number(header[1]) < 50) problems.push(`release-check.js scanned only ${header[1]} files; the package tree looks incomplete`);
  if (r.status !== 0) problems.push(`release-check.js exited ${r.status}`);
  if (header && !/\nclean\s*$/.test(out)) problems.push('release-check.js did not end with "clean"');
}

process.stdout.write(out);
if (problems.length) {
  console.error('\nRELEASE GATE FAILED');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log('release gate: pass');
