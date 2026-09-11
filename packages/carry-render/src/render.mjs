// validate → render (SSR through Vite so the design system's .jsx sources load untouched) → single-file HTML.
import path from 'node:path';
import { createServer } from 'vite';
import { validateArtifact, formatProblems } from 'carry-content';
import { assembleHtml } from './html.mjs';
import { versionStamp } from './version.mjs';
import { PKG } from './paths.mjs';

let viteP;
async function loadRenderer() {
  if (!viteP) viteP = createServer({ configFile: path.join(PKG, 'vite.config.mjs'), root: PKG }).then(async (vite) => ({ vite, mod: await vite.ssrLoadModule('/src/artifact.jsx') }));
  return (await viteP).mod;
}
export async function closeRenderer() { if (viteP) { const { vite } = await viteP; viteP = null; await vite.close(); } }

export class ArtifactValidationError extends Error {
  constructor(result) { super(formatProblems(result)); this.name = 'ArtifactValidationError'; this.result = result; }
}

/** @returns {Promise<{ html: string, artifact: object, rendered: object, warnings: string[] }>} */
export async function renderToHtml(raw, { publicBuild = false } = {}) {
  const v = validateArtifact(raw, { publicBuild });
  if (!v.ok) throw new ArtifactValidationError(v);
  const { renderArtifact } = await loadRenderer();
  const rendered = renderArtifact(v.value, { publicBuild, stamp: versionStamp().line });
  const html = assembleHtml({ artifact: v.value, rendered, publicBuild });
  return { html, artifact: v.value, rendered, warnings: [...v.warnings.map((w) => `${w.path} [${w.code}] ${w.message}`), ...rendered.warnings] };
}
