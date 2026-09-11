import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { validateArtifact } from '../src/index.js';

const ex = (name: string) => JSON.parse(readFileSync(new URL(`../examples/${name}`, import.meta.url), 'utf8'));
const social = () => ex('social.placeholder.json');
const codes = (r: ReturnType<typeof validateArtifact>) => (r.ok ? [] : r.errors.map((e) => e.code));
const warnCodes = (r: ReturnType<typeof validateArtifact>) => r.warnings.map((w) => w.code);

describe('examples', () => {
  for (const f of readdirSync(new URL('../examples/', import.meta.url)).filter((f) => f.endsWith('.json'))) {
    it(`${f} validates (internal build)`, () => {
      const r = validateArtifact(ex(f));
      expect(r.ok, JSON.stringify(r, null, 1)).toBe(true);
    });
    it(`${f} fails a public build while release is "review"`, () => {
      expect(codes(validateArtifact(ex(f), { publicBuild: true }))).toContain('not-approved-for-public');
    });
  }
});

describe('fail-closed rules', () => {
  it('rejects unknown keys anywhere', () => {
    const r = validateArtifact({ ...social(), badge: 'confirmed' });
    expect(codes(r)).toContain('unknown-key');
    const r2 = validateArtifact({ ...social(), support: [{ key: 'k', value: 'v', state: { certainty: 'confirmed', colour: 'red' } }] });
    expect(codes(r2)).toContain('unknown-key');
  });
  it('rejects unknown certainty and release values instead of substituting', () => {
    expect(codes(validateArtifact({ ...social(), states: [{ certainty: 'likely' }] }))).toContain('unknown-value');
    expect(codes(validateArtifact({ ...social(), release: 'public' }))).toContain('unknown-value');
    expect(codes(validateArtifact({ ...social(), form: 'handle-operating-truth' }))).toContain('unknown-value');
  });
  it('requires a lead for every form except observation-development', () => {
    const { lead, ...noLead } = social();
    expect(codes(validateArtifact(noLead))).toContain('missing-lead');
    expect(validateArtifact({ ...noLead, form: 'observation-development' }).ok).toBe(true);
  });
  it('requires claims_register_ref for verified content', () => {
    expect(codes(validateArtifact({ ...social(), content_kind: 'verified' }))).toContain('missing-claims-ref');
    expect(validateArtifact({ ...social(), content_kind: 'verified', claims_register_ref: 'CR-000' }).ok).toBe(true);
  });
  it('tells renderers to label illustrative content', () => {
    expect(warnCodes(validateArtifact({ ...social(), content_kind: 'illustrative' }))).toContain('must-label-illustrative');
  });
  it('warns on a gate without an owner (a delay, not a gate)', () => {
    const r = validateArtifact({ ...social(), states: [{ certainty: 'confirmed', gated: { gate: 'legal review' } }] });
    expect(r.ok).toBe(true);
    expect(warnCodes(r)).toContain('gate-without-owner');
  });
  it('accepts Confirmed·gated and Unknown·approved: the axes are independent', () => {
    const r = validateArtifact({ ...social(), release: 'approved', states: [
      { certainty: 'confirmed', gated: { gate: 'g', owner: 'o', clears: 'c' }, release: 'review' },
      { certainty: 'unknown', release: 'approved' },
    ] });
    expect(r.ok).toBe(true);
  });
  it('public build refuses superseded, internal and restricted wherever they occur', () => {
    const base = { ...social(), release: 'approved' };
    expect(codes(validateArtifact({ ...base, states: [{ certainty: 'superseded' }] }, { publicBuild: true }))).toContain('operating-only-in-public');
    expect(codes(validateArtifact({ ...base, support: [{ key: 'k', value: 'v', state: { certainty: 'confirmed', release: 'internal' } }] }, { publicBuild: true }))).toContain('operating-only-in-public');
    expect(codes(validateArtifact({ ...base, states: [{ certainty: 'confirmed', release: 'restricted' }] }, { publicBuild: true }))).toContain('operating-only-in-public');
    expect(validateArtifact(base, { publicBuild: true }).ok).toBe(true);
  });
  it('approval never confirms: a public build keeps Unknown as Unknown', () => {
    const r = validateArtifact({ ...social(), release: 'approved', states: [{ certainty: 'unknown' }] }, { publicBuild: true });
    expect(r.ok && r.value.states[0].certainty).toBe('unknown');
  });
  it('enforces mode requirements: consequence for systems/evidence, handoff for executive/evidence', () => {
    const doc = ex('document.placeholder.json');
    const { consequence, ...noCons } = doc;
    expect(codes(validateArtifact(noCons))).toContain('missing-consequence');
    const { handoff, ...noHand } = doc;
    expect(codes(validateArtifact(noHand))).toContain('missing-handoff');
  });
  it('graphite ground at artifact level only in personal mode', () => {
    expect(codes(validateArtifact({ ...social(), ground: 'graphite' }))).toContain('graphite-outside-personal');
    expect(validateArtifact({ ...social(), mode: 'personal', ground: 'graphite' }).ok).toBe(true);
  });
  it('internal sources are named, never linked', () => {
    expect(codes(validateArtifact({ ...social(), sources: [{ name: 'Claims Register', kind: 'internal', url: 'https://example.org/x' }] }))).toContain('linked-internal-source');
  });
  it('diagram connectors must reference existing nodes; node ids unique', () => {
    const d = ex('diagram.placeholder.json');
    d.diagram.connectors.push({ from: 'a', to: 'zzz' });
    expect(codes(validateArtifact(d))).toContain('unknown-node');
    const d2 = ex('diagram.placeholder.json');
    d2.diagram.lanes[1].nodes[0].id = 'a';
    expect(codes(validateArtifact(d2))).toContain('duplicate-node-id');
  });
  it('deck: duplicate slide ids fail; a deck without a close warns; table rows need every column', () => {
    const deck = ex('deck.placeholder.json');
    deck.slides[1].id = 'title';
    expect(codes(validateArtifact(deck))).toContain('duplicate-slide-id');
    const deck2 = ex('deck.placeholder.json');
    deck2.slides.pop();
    expect(warnCodes(validateArtifact(deck2))).toContain('deck-without-close');
    const deck3 = ex('deck.placeholder.json');
    delete deck3.slides[5].table.rows[0].cost;
    expect(codes(validateArtifact(deck3))).toContain('missing-cell');
  });
  it('the engine badges[] vocabulary is rejected for Carry', () => {
    const deck = ex('deck.placeholder.json');
    deck.slides[1].badges = ['confirmed'];
    expect(codes(validateArtifact(deck))).toContain('unknown-key');
  });
});
