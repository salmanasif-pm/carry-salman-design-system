import { afterAll, describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { renderToHtml, closeRenderer, ArtifactValidationError } from '../src/render.mjs';
import { toMarkdown } from '../src/markdown.mjs';
import { ILLUSTRATIVE_LABEL } from 'carry-content';

const exDir = new URL('../../carry-content/examples/', import.meta.url);
const ex = (f) => JSON.parse(readFileSync(new URL(f, exDir), 'utf8'));
afterAll(() => closeRenderer());

describe('render examples to self-contained HTML', () => {
  for (const f of readdirSync(exDir).filter((f) => f.endsWith('.json'))) {
    it(f, async () => {
      const { html, rendered, artifact } = await renderToHtml(ex(f));
      expect(html.startsWith('<!doctype html>')).toBe(true);
      expect(html).not.toMatch(/https?:\/\//);                       // nothing remote
      expect(html).toMatch(/data:font\/woff2;base64,/);              // fonts embedded
      expect(html).toMatch(/name="generator" content="carry-render/); // version stamped
      expect(html).toContain(`data-carry-mode="${artifact.mode}"`);
      expect(rendered.pages.length).toBeGreaterThan(0);
      expect(rendered.warnings).toEqual([]);
      if (artifact.artifact === 'deck') expect(rendered.pages.length).toBe(artifact.slides.length);
    }, 30000);
  }
});

describe('truth integrity in output', () => {
  it('illustrative content carries its label on every page', async () => {
    const a = { ...ex('carousel.placeholder.json'), content_kind: 'illustrative' };
    const { rendered } = await renderToHtml(a);
    for (const p of rendered.pages) expect(p.html).toContain(ILLUSTRATIVE_LABEL);
  });
  it('states render as fill and bar, never a colour word', async () => {
    const { rendered } = await renderToHtml(ex('deck.placeholder.json'));
    const html = rendered.pages.map((p) => p.html).join('');
    expect(html).toMatch(/data-carry-certainty="confirmed"/);
    expect(html).toMatch(/data-carry-gated="true"/);
    expect(html).toContain('review required');
    expect(html).not.toMatch(/\b(red|green|amber)\b/);
  });
  it('a gate names gate · owner · clears in the output', async () => {
    const { rendered } = await renderToHtml(ex('diagram.placeholder.json'));
    const html = rendered.pages[0].html;
    expect(html).toContain('[named owner]'); expect(html).toContain('[what has to be true]');
  });
  it('presenter notes never travel in a public build', async () => {
    const a = { ...ex('deck.placeholder.json'), release: 'approved' };
    a.slides[1].notes = 'speaker-only text';
    const internal = await renderToHtml(a);
    const pub = await renderToHtml(a, { publicBuild: true });
    expect(internal.html).toContain('speaker-only text');
    expect(pub.html).not.toContain('speaker-only text');
  });
  it('invalid content is refused, not repaired', async () => {
    await expect(renderToHtml({ ...ex('social.placeholder.json'), states: [{ certainty: 'likely' }] })).rejects.toBeInstanceOf(ArtifactValidationError);
    await expect(renderToHtml(ex('social.placeholder.json'), { publicBuild: true })).rejects.toThrow(/not-approved-for-public/);
  });
  it('diagram pages carry the alt-text pattern', async () => {
    const { rendered } = await renderToHtml(ex('diagram.placeholder.json'));
    expect(rendered.pages[0].alt).toMatch(/\d+ confirmed, \d+ provisional, \d+ unknown; \d+ gated; load carried by/);
  });
  it('markdown keeps every state as text', () => {
    const md = toMarkdown(ex('deck.placeholder.json'), { stamp: 'x' });
    expect(md).toContain('confirmed · gated on [condition] · owner [named owner]');
    expect(md).toContain('release: review required');
  });
});
