// Single-file assembly: CSS inlined (tokens + fonts as data URIs), runtime inlined, version stamped, print stylesheet,
// prefers-reduced-motion honoured through the design system's own tokens.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { designSystemCss, assertSelfContained } from './css.mjs';
import { versionStamp } from './version.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonForScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const runtime = readFileSync(path.join(import.meta.dirname, 'runtime.js'), 'utf8');

const SHELL_CSS = `
html,body{margin:0;height:100%}
body{background:var(--ground);overflow:hidden}
body[data-carry-flow]{overflow:auto}
.carry-stage{position:relative;width:100%;height:100%;display:flex;align-items:flex-start;justify-content:center;overflow:hidden}
.carry-pageframe{transform-origin:top left;transform:scale(var(--carry-scale,1));flex:none}
.carry-pageframe[hidden]{display:none}
.carry-hud{position:fixed;left:0;right:0;bottom:0;display:flex;justify-content:space-between;padding:6px 12px;font:400 11px/1 ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);pointer-events:none}
[data-export] .carry-hud{display:none}
body[data-carry-flow] .carry-stage{height:auto;display:block}
body[data-carry-flow] .carry-pageframe{transform:none;margin:0 auto}
`;
const printCss = (fmt, flow) => flow
  ? `@media print{@page{size:letter;margin:0}html,body{background:#fff!important;overflow:visible!important;height:auto!important}.carry-hud{display:none!important}.carry-pageframe{transform:none!important;margin:0!important}.carry-page{width:auto!important}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`
  : `@media print{@page{size:${fmt.w}px ${fmt.h}px;margin:0}html,body{background:#fff!important;overflow:visible!important;height:auto!important}.carry-hud{display:none!important}.carry-stage{display:block!important;height:auto!important;overflow:visible!important}.carry-pageframe{display:block!important;transform:none!important;width:${fmt.w}px;height:${fmt.h}px;page-break-after:always;break-inside:avoid}.carry-pageframe:last-child{page-break-after:auto}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;animation:none!important;transition:none!important}}`;

export function assembleHtml({ artifact, rendered, publicBuild = false }) {
  const stamp = versionStamp();
  const flow = rendered.format.h === null;
  const css = [designSystemCss(), SHELL_CSS, printCss(rendered.format, flow)].join('\n');
  assertSelfContained(css);
  const meta = { artifact: artifact.artifact, mode: artifact.mode, ground: artifact.ground, form: artifact.form, content_kind: artifact.content_kind, release: artifact.release, public: publicBuild, pages: rendered.pages.map((p) => p.id), ds: stamp.ds, digest: stamp.digest, render: stamp.render };
  const frames = rendered.pages.map((p, i) => `<div class="carry-pageframe" data-page="${esc(p.id)}" data-index="${i}" data-w="${rendered.format.w}" data-h="${rendered.format.h ?? ''}" data-carry-ground="${esc(p.ground)}"${p.alt ? ` aria-label="${esc(p.alt)}"` : ''}${i > 0 && !flow ? ' hidden' : ''}>${p.html}</div>`).join('\n');
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(artifact.title ?? artifact.above)}</title>
<meta name="generator" content="${esc(stamp.generator)}">
<meta name="carry-artifact" content='${jsonForScript(meta).replace(/'/g, '&#39;')}'>
<style>
${css}
</style>
</head>
<body data-carry-mode="${esc(artifact.mode)}" data-carry-ground="${esc(artifact.ground)}"${flow ? ' data-carry-flow' : ''}>
<div class="carry-stage">
${frames}
</div>
${flow ? '' : `<div class="carry-hud" aria-hidden="true"><span>arrows / space / swipe · F fullscreen</span><span class="carry-counter"></span><span>${esc(stamp.line)}</span></div>`}
<script type="application/json" id="carry-data">${jsonForScript({ notes: publicBuild ? {} : Object.fromEntries(rendered.pages.filter((p) => p.notes).map((p) => [p.id, p.notes])) })}</script>
<script>
${runtime}
</script>
</body>
</html>
`;
  return html;
}
