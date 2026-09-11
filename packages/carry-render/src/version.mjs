// Version stamp: every output says what it was built with (engine rule 7, carried into Carry).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { DS, PKG } from './paths.mjs';

let cached;
export function versionStamp() {
  if (cached) return cached;
  const human = readFileSync(path.join(DS, 'readme.md'), 'utf8').match(/Version\s+([\d.]+)/)?.[1] ?? 'unknown';
  const head = readFileSync(path.join(DS, '_ds_bundle.js'), 'utf8').slice(0, 65536).match(/\/\*\s*@ds-bundle:\s*(\{.*?\})\s*\*\//s);
  const header = head ? JSON.parse(head[1]) : { namespace: 'DesignSystem_79e114', sourceHashes: {} };
  const digest = createHash('sha256').update(Object.entries(header.sourceHashes ?? {}).sort(([a], [b]) => a.localeCompare(b)).map(([p, h]) => `${p}:${h}`).join('\n')).digest('hex').slice(0, 12);
  const render = JSON.parse(readFileSync(path.join(PKG, 'package.json'), 'utf8')).version;
  cached = {
    ds: human, namespace: header.namespace, digest, render,
    line: `carry-ds ${human} · ${header.namespace.replace(/^DesignSystem_/, '')}@${digest} · carry-render ${render}`,
    generator: `carry-render ${render}; carry-ds ${human} (${header.namespace}@${digest})`,
  };
  return cached;
}
