#!/usr/bin/env node
// carry-render <artifact.json> [--out <dir>] [--public] [--png] [--pdf] [--pptx] [--md] [--grey] [--all] [--scale 1,2]
// Outputs land in <out>/ (default dist/<name>[-public]/). Nothing is uploaded anywhere.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { renderToHtml, closeRenderer, ArtifactValidationError } from '../src/render.mjs';
import { exportArtifact } from '../src/export.mjs';
import { deckToPptx } from '../src/pptx.mjs';
import { toMarkdown } from '../src/markdown.mjs';
import { versionStamp } from '../src/version.mjs';

const args = process.argv.slice(2); const flag = (f) => args.includes(f); const opt = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };
const file = args.find((a) => !a.startsWith('--') && a.endsWith('.json'));
if (!file) { console.error('usage: carry-render <artifact.json> [--out dir] [--public] [--png] [--pdf] [--pptx] [--md] [--grey] [--all] [--scale 1,2]'); process.exit(2); }
const publicBuild = flag('--public'); const all = flag('--all');
const name = path.basename(file).replace(/\.json$/, '') + (publicBuild ? '-public' : '');
const out = path.resolve(opt('--out', path.join('dist', name)));
try {
  const raw = JSON.parse(readFileSync(file, 'utf8'));
  const { html, artifact, rendered, warnings } = await renderToHtml(raw, { publicBuild });
  mkdirSync(out, { recursive: true });
  const htmlPath = path.join(out, 'index.html'); writeFileSync(htmlPath, html);
  console.log(`✓ ${name}: ${artifact.artifact} · ${rendered.pages.length} page(s) → ${path.relative(process.cwd(), htmlPath)} (${(html.length / 1024).toFixed(0)} KB) · ${versionStamp().line}`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
  if (all || flag('--png') || flag('--pdf') || flag('--grey')) {
    const scales = (opt('--scale', '1,2')).split(',').map(Number);
    const files = await exportArtifact({ htmlPath, outDir: out, format: rendered.format, scales, pdf: all || flag('--pdf'), grey: all || flag('--grey') });
    console.log(`  ${files.length} export file(s): ${[...new Set(files.map((f) => path.relative(out, path.dirname(f)) || '.'))].join(', ')}`);
  }
  if ((all || flag('--pptx')) && artifact.artifact === 'deck') { await deckToPptx(artifact, { stamp: versionStamp().line, outFile: path.join(out, 'deck.pptx') }); console.log('  deck.pptx (native text)'); }
  else if (flag('--pptx')) console.log('  ⚠ --pptx applies to deck artifacts only; skipped');
  if (all || flag('--md')) { writeFileSync(path.join(out, 'artifact.md'), toMarkdown(artifact, { stamp: versionStamp().line })); console.log('  artifact.md (Notion-compatible)'); }
} catch (e) {
  if (e instanceof ArtifactValidationError) { console.error(`✗ ${name}: content invalid\n${e.message}`); process.exit(1); }
  console.error(`✗ ${name}: ${e.stack ?? e}`); process.exit(1);
} finally { await closeRenderer(); }
