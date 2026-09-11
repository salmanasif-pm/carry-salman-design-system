// Loads packages/carry-ds/styles.css, inlines its local @imports in declared order, embeds the OFL fonts as data URIs,
// and asserts the result is self-contained. The design system is never modified; this is an in-memory copy.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { DS } from './paths.mjs';

const MIME = { '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
const dataUri = (abs) => `data:${MIME[path.extname(abs)] ?? 'application/octet-stream'};base64,${readFileSync(abs).toString('base64')}`;

function inline(fileAbs, seen) {
  if (seen.has(fileAbs)) return '';
  seen.add(fileAbs);
  const dir = path.dirname(fileAbs);
  let css = readFileSync(fileAbs, 'utf8');
  css = css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (whole, q, ref) => /^(data:|#|https?:)/.test(ref) ? whole : `url("${dataUri(path.resolve(dir, ref))}")`);
  return css.replace(/@import\s+(?:url\(\s*)?(['"]?)([^'")]+)\1\s*\)?\s*;/g, (whole, q, ref) => /^https?:/.test(ref) ? `/* remote import dropped: ${ref} */` : inline(path.resolve(dir, ref), seen));
}

let cached;
export function designSystemCss() {
  if (cached) return cached;
  const css = inline(path.join(DS, 'styles.css'), new Set()).replace(/\/\*[^]*?\*\//g, '');
  assertSelfContained(css);
  cached = css;
  return css;
}

export function assertSelfContained(css) {
  if (/@import/.test(css)) throw new Error('CSS still contains @import');
  const bad = css.match(/url\(\s*(?!['"]?(?:data:|#))[^)]+\)/);
  if (bad) throw new Error(`CSS still references a file: ${bad[0].slice(0, 120)}`);
  if (/https?:\/\//.test(css)) throw new Error('CSS still contains a remote URL');
}
