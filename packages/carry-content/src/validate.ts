import { z } from 'zod';
import { Artifact, type Artifact as ArtifactT, type State } from './schema.js';
import { ILLUSTRATIVE_LABEL } from './vocab.js';

export interface Problem { path: string; code: string; message: string }
export type ValidationResult =
  | { ok: true; value: ArtifactT; warnings: Problem[]; publicBuild: boolean }
  | { ok: false; value: null; errors: Problem[]; warnings: Problem[]; publicBuild: boolean };

const p = (path: Array<string | number>) => path.length ? path.map((s) => (typeof s === 'number' ? `[${s}]` : `.${s}`)).join('').replace(/^\./, '') : '<root>';

/**
 * Fail-closed validation. Never repairs: an unknown key, an unknown state, a missing lead or a
 * missing claims reference is an error the author fixes. Public builds additionally refuse every
 * operating-only value (superseded · internal · restricted) and any artifact not released as approved.
 */
export function validateArtifact(raw: unknown, opts: { publicBuild?: boolean; claims?: Iterable<string> } = {}): ValidationResult {
  const publicBuild = opts.publicBuild ?? false;
  const errors: Problem[] = [];
  const warnings: Problem[] = [];
  const parsed = Artifact.safeParse(raw);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const code = issue.code === 'unrecognized_keys' ? 'unknown-key' : issue.code === 'invalid_value' || issue.code === 'invalid_union' ? 'unknown-value' : issue.code;
      errors.push({ path: p(issue.path as Array<string | number>), code, message: issue.message });
    }
    return { ok: false, value: null, errors, warnings, publicBuild };
  }
  const a = parsed.data;
  const err = (path: string, code: string, message: string) => errors.push({ path, code, message });
  const warn = (path: string, code: string, message: string) => warnings.push({ path, code, message });

  // Lead: every form except observation-development needs one (rules.md strong default; engine-integration §2 fail-closed).
  const needsLead = (form: string, lead: unknown, path: string) => {
    if (form !== 'observation-development' && !lead) err(path, 'missing-lead', `form "${form}" requires a lead line (decision · recommendation · question · refusal · next · kept · open)`);
  };
  needsLead(a.form, a.lead, 'lead');
  if (a.artifact === 'carousel') a.panels.forEach((pn, i) => needsLead(pn.form, pn.lead, `panels[${i}].lead`));
  if (a.artifact === 'deck') a.slides.forEach((s, i) => { if (s.type === 'statement') needsLead(s.form, s.lead, `slides[${i}].lead`); });

  // Content kind.
  if (a.content_kind === 'verified' && !a.claims_register_ref) err('claims_register_ref', 'missing-claims-ref', 'content_kind "verified" requires a Claims Register reference; without one the content is illustrative or placeholder');
  if (a.content_kind === 'verified' && a.claims_register_ref && opts.claims) {
    const known = new Set(opts.claims);
    if (!known.has(a.claims_register_ref)) err('claims_register_ref', 'unknown-claims-ref', `"${a.claims_register_ref}" is not an approved row in content/claims.json — run claims-sync, or the content is not verified`);
  }
  if (a.content_kind !== 'verified' && a.claims_register_ref) warn('claims_register_ref', 'unused-claims-ref', 'a Claims Register reference on non-verified content is ignored by renderers');

  // Mode requirements (engine-integration §2).
  if ((a.mode === 'systems' || a.mode === 'evidence') && !a.consequence) err('consequence', 'missing-consequence', `mode "${a.mode}" requires consequence { who, text } (one ConsequenceNote per technical artifact)`);
  if ((a.mode === 'executive' || a.mode === 'evidence') && !a.handoff) err('handoff', 'missing-handoff', `mode "${a.mode}" requires handoff { state, next, owner, artifact }`);
  if (a.ground === 'graphite' && a.mode !== 'personal') err('ground', 'graphite-outside-personal', 'graphite ground is allowed at artifact level only in personal mode; individual deck slides may set ground: "graphite" for transitions and closers');

  // Sources: internal and restricted are named, never linked.
  a.sources.forEach((s, i) => { if (s.url && s.kind !== 'public') err(`sources[${i}].url`, 'linked-internal-source', `${s.kind} sources are named, never linked`); });

  // States, wherever they occur.
  const states: Array<[string, State]> = [];
  a.states.forEach((s, i) => states.push([`states[${i}]`, s]));
  const rows = (arr: Array<{ state?: State }>, base: string) => arr.forEach((r, i) => { if (r.state) states.push([`${base}[${i}].state`, r.state]); });
  if (a.artifact === 'social') rows(a.support, 'support');
  if (a.artifact === 'carousel') a.panels.forEach((pn, i) => rows(pn.support, `panels[${i}].support`));
  if (a.artifact === 'document') { a.sections.forEach((s, i) => { if (s.state) states.push([`sections[${i}].state`, s.state]); rows(s.evidence, `sections[${i}].evidence`); }); }
  const diagramStates = (d: { lanes: Array<{ nodes: Array<{ certainty: string; gated?: boolean | object }> }> }, base: string) =>
    d.lanes.forEach((l, i) => l.nodes.forEach((n, j) => states.push([`${base}.lanes[${i}].nodes[${j}]`, { certainty: n.certainty as State['certainty'], gated: n.gated as State['gated'] }])));
  if (a.artifact === 'diagram') diagramStates(a.diagram, 'diagram');
  if (a.artifact === 'deck') a.slides.forEach((s, i) => {
    if (s.type === 'decision' || s.type === 'evidence') rows(s.evidence, `slides[${i}].evidence`);
    if (s.type === 'timeline') rows(s.steps, `slides[${i}].steps`);
    if (s.type === 'diagram') diagramStates(s.diagram, `slides[${i}].diagram`);
    if (s.type === 'table') s.table.rows.forEach((r, j) => Object.entries(r).forEach(([k, v]) => { if (typeof v === 'object') states.push([`slides[${i}].table.rows[${j}].${k}`, v]); }));
  });
  for (const [path, s] of states) {
    if (typeof s.gated === 'object' && !s.gated.owner) warn(`${path}.gated.owner`, 'gate-without-owner', 'a gate without an owner is a delay, not a gate');
    if (publicBuild) {
      if (s.certainty === 'superseded') err(`${path}.certainty`, 'operating-only-in-public', '"superseded" is operating history and fails a public build');
      if (s.release === 'internal' || s.release === 'restricted') err(`${path}.release`, 'operating-only-in-public', `release "${s.release}" fails a public build`);
    }
  }
  if (publicBuild) {
    if (a.release !== 'approved') err('release', 'not-approved-for-public', `public build requires release "approved" (got "${a.release}"); approval is a named human's act and never confirms the content`);
    if (a.artifact === 'deck') a.slides.forEach((s, i) => { if (s.notes) warn(`slides[${i}].notes`, 'notes-dropped-in-public', 'presenter notes never travel in public artifacts; renderers must drop them'); });
  }
  if (a.content_kind === 'illustrative') warn('content_kind', 'must-label-illustrative', `renderers must show the label "${ILLUSTRATIVE_LABEL}"`);

  // Diagram connector references.
  const checkDiagram = (d: { lanes: Array<{ nodes: Array<{ id: string }> }>; connectors: Array<{ from: string; to: string }> }, base: string) => {
    const ids = new Set(d.lanes.flatMap((l) => l.nodes.map((n) => n.id)));
    if (ids.size !== d.lanes.reduce((n, l) => n + l.nodes.length, 0)) err(`${base}.lanes`, 'duplicate-node-id', 'node ids must be unique across lanes');
    d.connectors.forEach((c, i) => { for (const end of ['from', 'to'] as const) if (!ids.has(c[end])) err(`${base}.connectors[${i}].${end}`, 'unknown-node', `no node with id "${c[end]}"`); });
  };
  if (a.artifact === 'diagram') checkDiagram(a.diagram, 'diagram');
  if (a.artifact === 'deck') {
    const ids = new Set<string>();
    a.slides.forEach((s, i) => { if (ids.has(s.id)) err(`slides[${i}].id`, 'duplicate-slide-id', `duplicate slide id "${s.id}"`); ids.add(s.id); if (s.type === 'diagram') checkDiagram(s.diagram, `slides[${i}].diagram`); });
    if (a.slides[a.slides.length - 1]?.type !== 'close') warn('slides', 'deck-without-close', 'a shareable deck ends with a close slide (HandoffFooter)');
  }
  if (a.artifact === 'deck') a.slides.forEach((s, i) => { if (s.type === 'table') s.table.rows.forEach((r, j) => { for (const c of s.table.columns) if (!(c.key in r)) err(`slides[${i}].table.rows[${j}].${c.key}`, 'missing-cell', `row lacks column "${c.key}" — use "—" for a legitimately empty cell`); }); });

  if (errors.length) return { ok: false, value: null, errors, warnings, publicBuild };
  return { ok: true, value: a, warnings, publicBuild };
}

export function formatProblems(r: ValidationResult): string {
  const lines: string[] = [];
  if (!r.ok) for (const e of r.errors) lines.push(`ERROR ${e.path} [${e.code}] ${e.message}`);
  for (const w of r.warnings) lines.push(`WARN  ${w.path} [${w.code}] ${w.message}`);
  lines.push(r.ok ? `valid${r.publicBuild ? ' (public build)' : ''}` : `invalid: ${r.errors.length} error(s)`);
  return lines.join('\n');
}

export const zodVersion = z.core ? '4' : '3';
