import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { releaseGate, vocabularyLint, confidentialityLint } from '../src/brief-lint.mjs';

const fixture = () => JSON.parse(readFileSync(new URL('../fixtures/brief-discovery-composite.json', import.meta.url), 'utf8'));
const cli = new URL('../bin/validate-brief.js', import.meta.url).pathname;
const run = (brief: unknown) => { const f = path.join(mkdtempSync(path.join(tmpdir(), 'brief-')), 'b.json'); writeFileSync(f, JSON.stringify(brief)); try { return { code: 0, out: execFileSync(process.execPath, [cli, f, '--json'], { encoding: 'utf8' }) }; } catch (e: any) { return { code: e.status, out: e.stdout }; } };
const failures = (brief: unknown): { code: number; list: string[] } => { const r = run(brief); return { code: r.code, list: JSON.parse(r.out).failures.map((f: { path: string; message: string }) => `${f.path}: ${f.message}`) }; };

describe('brief §7 fixture', () => {
  it('validates, passes both lints, and the gate fails (internal)', () => {
    const r = run(fixture()); const j = JSON.parse(r.out);
    expect(r.code).toBe(0); expect(j.ok).toBe(true); expect(j.gate.result).toBe('internal');
    expect(j.gate.reason).toContain('internal_only'); expect(j.gate.reason).toContain('needs_human_review');
  });
});
describe('fail-closed rules', () => {
  it('unknown keys anywhere', () => { const b = fixture(); b.publish_status = 'Ready'; expect(failures(b).list.some((s) => /unknown key "publish_status"/.test(s))).toBe(true); });
  it('closed enums; schema_version pinned', () => { const b = fixture(); b.certainty = 'likely'; b.schema_version = '1.1'; const l = failures(b).list; expect(l.some((s) => s.startsWith('/certainty'))).toBe(true); expect(l.some((s) => s.startsWith('/schema_version'))).toBe(true); });
  it('required set from §6', () => { const b = fixture(); delete b.moves; delete b.text; const l = failures(b).list; expect(l.some((s) => /moves/.test(s))).toBe(true); expect(l.some((s) => /text/.test(s))).toBe(true); });
  it('is_derivative must be false', () => { const b = fixture(); b.source.is_derivative = true; expect(failures(b).list.some((s) => /is_derivative/.test(s))).toBe(true); });
  it('motion needs a static twin', () => { const b = fixture(); b.motion_opportunity.static_equivalent = ''; expect(failures(b).list.some((s) => /static_equivalent/.test(s))).toBe(true); b.motion_opportunity = { role: 'none' }; expect(failures(b).code).toBe(0); });
  it('audience_action may not ask for follow/subscribe/share/like/tag', () => { const b = fixture(); b.audience_action = 'Please share this with your team.'; expect(failures(b).list.some((s) => /audience_action/.test(s))).toBe(true); });
  it('banned register wording fails', () => { const b = fixture(); b.evidence[0].register_status = 'banned'; expect(failures(b).list.some((s) => /register_status/.test(s))).toBe(true); });
  it('confidentiality lint: substring of an exclusion in any visible field', () => { const b = fixture(); b.confidentiality.exclusions.push('Acme'); b.text.alt_text = 'A call with ACME Corp.'; expect(failures(b).list.some((s) => /text.alt_text.*Acme/.test(s))).toBe(true); expect(confidentialityLint(b)).toHaveLength(1); });
  it('vocabulary lint: whole words, em dash anywhere, spaced en dash; runs for internal renders', () => {
    const b = fixture(); b.text.body += '\nThe gate stays closed — for now – and PS: gates.';
    const hits = vocabularyLint(b).map((h: any) => h.term);
    expect(hits).toContain('gate'); expect(hits).toContain('PS'); expect(hits.some((t: string) => /U\+2014/.test(t))).toBe(true); expect(hits.some((t: string) => /U\+2013/.test(t))).toBe(true);
    expect(hits).not.toContain('gated'); // "gates" is not "gated"; whole-word only
    expect(failures(b).code).toBe(1);
  });
  it('the gate has no override: only the two fields decide', () => {
    expect(releaseGate({ release_permission: 'approved_public', human_approval_state: 'approved_by_salman' }).result).toBe('public');
    expect(releaseGate({ release_permission: 'approved_public', human_approval_state: 'voice_rubric_passed' }).result).toBe('internal');
    expect(releaseGate({ release_permission: 'draft_shareable', human_approval_state: 'approved_by_salman', public: true } as any).result).toBe('internal');
  });
});
