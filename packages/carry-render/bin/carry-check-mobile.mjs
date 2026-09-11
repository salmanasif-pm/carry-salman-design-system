#!/usr/bin/env node
// carry-check-mobile <artifact.json> [--out dir] [--min 12]   (social and carousel artifacts)
// Renders, then measures every [data-carry-essential] node at 360 and 320 CSS px display width and captures greyscale.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { renderToHtml, closeRenderer, ArtifactValidationError } from '../src/render.mjs';
import { mobileCheck } from '../src/export.mjs';
const args = process.argv.slice(2); const opt = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };
const file = args.find((a) => !a.startsWith('--') && a.endsWith('.json'));
if (!file) { console.error('usage: carry-check-mobile <artifact.json> [--out dir] [--min 12]'); process.exit(2); }
const out = path.resolve(opt('--out', path.join('dist', path.basename(file).replace(/\.json$/, ''), 'mobile')));
try {
  const { html, artifact, rendered } = await renderToHtml(JSON.parse(readFileSync(file, 'utf8')));
  if (!['social', 'carousel'].includes(artifact.artifact)) { console.log(`skip: mobile check applies to social and carousel artifacts (got ${artifact.artifact})`); process.exit(0); }
  mkdirSync(out, { recursive: true }); const htmlPath = path.join(out, 'index.html'); writeFileSync(htmlPath, html);
  const report = await mobileCheck({ htmlPath, outDir: out, minPx: Number(opt('--min', '12')) });
  for (const [w, pages] of Object.entries(report.widths)) for (const p of pages) {
    console.log(`${w}px · page ${p.index}: ${p.nodes.map((n) => `${n.role} ${n.source}→${n.displayed}px`).join(' · ')}`);
    for (const f of p.failing) console.log(`  FAIL ${f.role} displays at ${f.displayed}px (< ${opt('--min', '12')}px): "${f.text}"`);
  }
  console.log(report.ok ? `mobile check: pass (${rendered.pages.length} page(s), greyscale captured in ${path.relative(process.cwd(), out)})` : 'mobile check: FAIL');
  process.exit(report.ok ? 0 : 1);
} catch (e) { console.error(e instanceof ArtifactValidationError ? e.message : (e.stack ?? e)); process.exit(1); } finally { await closeRenderer(); }
