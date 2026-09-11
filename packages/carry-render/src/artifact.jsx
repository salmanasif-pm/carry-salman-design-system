// Artifact renderer (SSR). One validated artifact → pages of static markup built from the design system's components.
// Content is rendered exactly as given: states as fill · bar · text, labels as the schema says, no wording changes.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ILLUSTRATIVE_LABEL, RELEASE_TAG, PROVENANCE_LINES } from 'carry-content';
import { Composition } from '@carry-ds/components/signature/Composition.jsx';
import { Threshold } from '@carry-ds/components/signature/Threshold.jsx';
import { StateMark } from '@carry-ds/components/signature/StateMark.jsx';
import { DecisionLine } from '@carry-ds/components/signature/DecisionLine.jsx';
import { EvidenceStrip } from '@carry-ds/components/signature/EvidenceStrip.jsx';
import { ConsequenceNote } from '@carry-ds/components/signature/ConsequenceNote.jsx';
import { CounterpointRail } from '@carry-ds/components/signature/CounterpointRail.jsx';
import { HandoffFooter } from '@carry-ds/components/signature/HandoffFooter.jsx';
import { Provenance } from '@carry-ds/components/signature/Provenance.jsx';
import { LoadNode } from '@carry-ds/components/diagram/LoadNode.jsx';
import { LoadLane } from '@carry-ds/components/diagram/LoadLane.jsx';
import { Connector } from '@carry-ds/components/diagram/Connector.jsx';
import { Legend } from '@carry-ds/components/diagram/Legend.jsx';
import { ProgressionLadder } from '@carry-ds/components/diagram/ProgressionLadder.jsx';
import { Matrix } from '@carry-ds/components/data/Matrix.jsx';
import { Wordmark } from '@carry-ds/components/brand/Wordmark.jsx';

export const FORMATS = {
  social: { w: 1080, h: 1080 }, carousel: { w: 1080, h: 1350 }, deck: { w: 1920, h: 1080 }, diagram: { w: 1600, h: 900 }, document: { w: 816, h: null },
};

const label = { font: '400 var(--text-label)/1 var(--font-truth)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--ink-3)' };
const mono = { font: 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)', color: 'var(--ink)' };
const sourceNames = (sources) => sources.map((s) => [s.name, s.kind !== 'public' ? s.kind : null, s.version, s.date].filter(Boolean).join(' · '));
const evidenceItems = (rows) => rows.map((r) => ({ label: r.key, value: r.value, certainty: r.state?.certainty, gated: r.state?.gated, release: r.state?.release, source: r.source }));
const leadKindForDecisionLine = (k) => (['decision', 'recommendation', 'question', 'refusal'].includes(k) ? k : undefined);
const leadLabel = { decision: 'Decision underneath', recommendation: 'Recommendation', question: 'Open', refusal: 'Not doing', next: 'Next', kept: 'Kept', open: 'Open' };

/** Footer band shared by every fixed-format page: content-kind label, release tag, version stamp. */
function Band({ a, ctx }) {
  return (
    <div className="carry-band" style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-5)', ...label }}>
      <span>{a.content_kind === 'illustrative' ? ILLUSTRATIVE_LABEL : a.content_kind === 'verified' ? `claims register ${a.claims_register_ref}` : 'placeholder content'}</span>
      <span>release · {RELEASE_TAG[a.release]}{ctx.publicBuild ? ' · public build' : ''}</span>
      <span>{ctx.stamp}</span>
    </div>
  );
}

// ---- social (1080²) and carousel (1080×1350): hand-scaled like the design system's own templates. Evidence sits at the top of the
// system's 36–42px range (42px on a 1080 source = 12.4px displayed at 320px, 14px at 360px); headline 100/80/64 by length; lead 46. ----
function Mark({ certainty = 'provisional', gated, size = 26 }) {
  const base = { width: size, height: size, flex: 'none', boxSizing: 'border-box', position: 'relative', marginTop: 14 };
  const fill = certainty === 'confirmed' ? { background: 'var(--ink)' } : certainty === 'unknown' ? { background: 'repeating-linear-gradient(135deg,var(--ink) 0 3px,transparent 3px 10px)' } : certainty === 'superseded' ? { background: 'var(--ink-4)' } : { border: '4px solid var(--ink)' };
  return <span aria-hidden="true" data-carry-certainty={certainty} data-carry-gated={gated ? 'true' : undefined} style={{ ...base, ...fill }}>{gated ? <span style={{ position: 'absolute', left: -3, right: -3, top: '50%', height: 6, transform: 'translateY(-50%)', background: 'var(--ink)' }} /> : null}</span>;
}
function Tile({ a, ctx, above, below, lead, form, support, w, h, index, count }) {
  const headline = above.length > 70 ? 64 : above.length > 44 ? 80 : 100;
  return (
    <div className="carry-tile" style={{ width: w, height: h, padding: 80, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', background: 'var(--ground)', color: 'var(--ink)', fontFamily: 'var(--font-handle)' }}>
      <div data-carry-essential="headline" style={{ flex: 1, display: 'flex', alignItems: 'flex-end', font: `500 ${headline}px/1 var(--font-handle)`, letterSpacing: '-.035em', paddingBottom: 48, textWrap: 'balance' }}>{above}</div>
      <div style={{ position: 'relative', height: 5, background: 'var(--rule-strong)' }}><span style={{ position: 'absolute', left: form === 'outcome-enabled' ? 'auto' : 0, right: form === 'outcome-enabled' ? 0 : 'auto', top: -11, width: 26, height: 26, ...(form === 'claim-support' || form === 'question-conditions' ? { border: '5px solid var(--signal)', boxSizing: 'border-box' } : { background: 'var(--signal)' }) }} /></div>
      {below && <div data-carry-essential="below" style={{ marginTop: 40, font: `400 42px/1.35 var(--font-truth)`, color: 'var(--ink-2)' }}>{below}</div>}
      {support?.length > 0 && (
        <div style={{ marginTop: 40, font: '400 42px/1.4 var(--font-truth)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '18px 24px', alignItems: 'start' }}>
          {support.map((r, i) => <React.Fragment key={i}><Mark certainty={r.state?.certainty} gated={r.state?.gated} /><span data-carry-essential="support"><span style={{ color: 'var(--ink-3)' }}>{r.key} · </span>{r.value}{r.state?.release ? <span style={{ ...label, fontSize: 24, marginLeft: 16, border: '2px solid var(--rule)', padding: '4px 10px' }}>{RELEASE_TAG[r.state.release]}</span> : null}</span></React.Fragment>)}
        </div>
      )}
      {lead && <div data-carry-essential="lead" style={{ marginTop: 'auto', font: '500 46px/1.25 var(--font-handle)', letterSpacing: '-.015em', textWrap: 'pretty' }}><span style={{ color: 'var(--signal-text)' }}>{leadLabel[lead.kind]}: </span>{lead.text}</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 44, gap: 24 }}>
        <span style={{ font: '500 30px/1 var(--font-handle)', letterSpacing: '-.02em', paddingBottom: 10, borderBottom: '4px solid var(--rule-strong)' }}>Salman Asif</span>
        <span style={{ ...label, fontSize: 22, textAlign: 'right' }}>{count > 1 ? `${index + 1} / ${count} · ` : ''}{a.content_kind === 'illustrative' ? ILLUSTRATIVE_LABEL : a.content_kind === 'verified' ? `claims register ${a.claims_register_ref}` : 'placeholder'}</span>
      </div>
      <div style={{ ...label, fontSize: 18, marginTop: 16, color: 'var(--ink-4)' }}>{ctx.stamp}{ctx.publicBuild ? ' · public build' : ''}</div>
    </div>
  );
}

// ---- deck (1920×1080) ----
function Slide({ a, ctx, children, ground, heading, index, count, sources }) {
  return (
    <div className="carry-slide" data-carry-ground={ground ?? a.ground} style={{ width: 1920, height: 1080, padding: 'var(--pad-slide)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--gap-section)', background: 'var(--ground)', color: 'var(--ink)', ['--truth-scale']: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', ...label, fontSize: 16 }}><span>{a.title ?? ''}{heading ? ` · ${heading}` : ''}</span><span>{index + 1} / {count}</span></div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--gap-section)' }}>{children}</div>
      {sources?.length > 0 && <Provenance sources={sourceNames(sources)} maxLines={PROVENANCE_LINES[a.mode]} />}
      <Band a={a} ctx={ctx} />
    </div>
  );
}
function slideBody(s, a) {
  switch (s.type) {
    case 'title': return <>
      <Wordmark variant="full" size={40} />
      <div style={{ font: 'var(--weight-handle) var(--text-handle-xl)/var(--lh-handle-xl) var(--font-handle)', letterSpacing: 'var(--ls-handle-xl)', maxWidth: '24ch' }}>{s.title}</div>
      <Threshold fn="separation" hasTruth={false} />
      {s.subtitle && <div style={{ ...mono, fontSize: 'var(--text-body-l)', fontFamily: 'var(--font-handle)' }}>{s.subtitle}</div>}
    </>;
    case 'statement': return <Composition form={s.form} above={s.above} below={s.below} lead={s.lead?.text} leadLabel={s.lead ? leadLabel[s.lead.kind] : undefined} orientation="vertical" aboveSize="xl" style={{ gap: 'var(--sp-9)', minHeight: 560 }} />;
    case 'decision': return <>
      <DecisionLine kind={leadKindForDecisionLine(s.lead.kind)} reopens={s.lead.reopens} style={{ fontSize: 40, lineHeight: 1.25 }}>{s.lead.text}</DecisionLine>
      {s.evidence.length > 0 && <EvidenceStrip items={evidenceItems(s.evidence)} />}
      {s.counterpoint && <CounterpointRail>{s.counterpoint}</CounterpointRail>}
    </>;
    case 'evidence': return <>
      {s.heading && <div style={{ font: 'var(--weight-handle) var(--text-handle-l)/var(--lh-handle-l) var(--font-handle)', letterSpacing: 'var(--ls-handle-l)' }}>{s.heading}</div>}
      <Threshold fn="evidence" />
      <EvidenceStrip items={evidenceItems(s.evidence)} />
    </>;
    case 'table': return <>
      {s.heading && <div style={{ font: 'var(--weight-handle) var(--text-handle-l)/var(--lh-handle-l) var(--font-handle)' }}>{s.heading}</div>}
      <Matrix columns={s.table.columns.map((c) => c.header)} rows={s.table.rows.map((r, i) => ({ label: String(i + 1), cells: s.table.columns.map((c) => { const v = r[c.key]; return typeof v === 'string' ? v : { value: v.text, certainty: v.certainty, gated: v.gated }; }) }))} />
    </>;
    case 'diagram': return <>{s.heading && <div style={{ font: 'var(--weight-handle) var(--text-handle-m)/var(--lh-handle-m) var(--font-handle)' }}>{s.heading}</div>}<Diagram d={s.diagram} /></>;
    case 'timeline': return <>
      {s.heading && <div style={{ font: 'var(--weight-handle) var(--text-handle-l)/var(--lh-handle-l) var(--font-handle)' }}>{s.heading}</div>}
      <Threshold fn="progression" />
      <ProgressionLadder steps={s.steps.map((st) => ({ label: st.label, certainty: st.state?.certainty, gated: st.state?.gated }))} current={Math.max(0, s.steps.findIndex((st) => st.current))} />
    </>;
    case 'consequence': return <ConsequenceNote who={s.consequence.who} style={{ fontSize: 'var(--text-body-l)' }}>{s.consequence.text}</ConsequenceNote>;
    case 'close': return <>
      <div style={{ flex: 1 }} />
      <HandoffFooter certainty={a.states[0]?.certainty ?? 'provisional'} release={a.release} stateLabel={s.handoff.state} next={s.handoff.next} owner={s.handoff.owner} artifact={s.handoff.artifact} version={s.handoff.version} />
      <Wordmark variant="lockup" size={28} />
    </>;
    default: return <Fallback reason={`Unknown slide type "${s.type}"`} raw={s} />;
  }
}
function Fallback({ reason, raw }) {
  return <div data-carry-fallback style={{ border: 'var(--stroke) solid var(--ink)', padding: 'var(--sp-6)', display: 'grid', gap: 'var(--sp-4)', maxWidth: 1100 }}>
    <div style={{ font: 'var(--weight-handle) var(--text-handle-m)/var(--lh-handle-m) var(--font-handle)' }}>{reason}</div>
    <div style={mono}>This part could not be rendered by this version. The artifact continues; nothing is invented in its place.</div>
    <pre style={{ ...mono, whiteSpace: 'pre-wrap', color: 'var(--ink-3)', maxHeight: 360, overflow: 'hidden', margin: 0 }}>{JSON.stringify(raw, null, 2).slice(0, 600)}</pre>
  </div>;
}

// ---- diagram ----
function Diagram({ d }) {
  const byId = new Map(d.lanes.flatMap((l) => l.nodes.map((n) => [n.id, n])));
  const outgoing = (id) => d.connectors.filter((c) => c.from === id);
  return (
    <div data-carry-diagram style={{ display: 'grid', gap: 'var(--gap-block)' }}>
      {d.lanes.map((l) => (
        <LoadLane key={l.id} label={l.owner} boundary={l.boundary}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
            {l.nodes.map((n, i) => <React.Fragment key={n.id}>
              <LoadNode title={n.label} certainty={n.certainty === 'superseded' ? 'unknown' : n.certainty} gated={n.gated} carries={n.carries} />
              {outgoing(n.id).map((c, j) => <Connector key={j} certainty={c.certainty} label={c.label ? `${c.label} → ${byId.get(c.to)?.label ?? c.to}` : `→ ${byId.get(c.to)?.label ?? c.to}`} />)}
            </React.Fragment>)}
          </div>
        </LoadLane>
      ))}
      {d.legend && <Legend states={['confirmed', 'provisional', 'unknown']} gated={d.lanes.some((l) => l.nodes.some((n) => n.gated))} connectors={d.connectors.length > 0} />}
    </div>
  );
}
function diagramAlt(d) {
  const nodes = d.lanes.flatMap((l) => l.nodes);
  const n = (c) => nodes.filter((x) => x.certainty === c).length;
  const carrier = nodes.find((x) => x.carries);
  return `${n('confirmed')} confirmed, ${n('provisional')} provisional, ${n('unknown')} unknown; ${nodes.filter((x) => x.gated).length} gated${carrier ? `; load carried by ${carrier.label}` : ''}`;
}

// ---- document (letter width, flowing) ----
function Document({ a, ctx }) {
  return (
    <article className="carry-page" style={{ width: FORMATS.document.w, padding: 'var(--pad-page)', boxSizing: 'border-box', background: 'var(--ground)', color: 'var(--ink)', display: 'grid', gap: 'var(--gap-section)' }}>
      <Wordmark variant="name" size={22} />
      {a.title && <h1 style={{ margin: 0, font: 'var(--weight-handle) var(--text-handle-m)/var(--lh-handle-m) var(--font-handle)', letterSpacing: 'var(--ls-handle-m)' }}>{a.title}</h1>}
      <Composition form={a.form} above={a.above} below={a.below} lead={a.lead?.text} leadLabel={a.lead ? leadLabel[a.lead.kind] : undefined} aboveSize="l" />
      {a.sections.map((s, i) => <section key={i} style={{ display: 'grid', gap: 'var(--gap-block)' }}>
        {s.heading && <h2 style={{ margin: 0, font: 'var(--weight-handle) var(--text-handle-s)/var(--lh-handle-s) var(--font-handle)', display: 'flex', gap: 'var(--sp-3)', alignItems: 'baseline' }}>{s.heading}{s.state && <StateMark certainty={s.state.certainty} gated={s.state.gated} release={s.state.release} size={11} />}</h2>}
        {s.body.map((p, j) => <p key={j} style={{ margin: 0, maxWidth: 'var(--measure)' }}>{p}</p>)}
        {s.evidence.length > 0 && <EvidenceStrip items={evidenceItems(s.evidence)} />}
      </section>)}
      {a.counterpoint && <CounterpointRail>{a.counterpoint}</CounterpointRail>}
      {a.consequence && <ConsequenceNote who={a.consequence.who}>{a.consequence.text}</ConsequenceNote>}
      {a.sources.length > 0 && <Provenance sources={sourceNames(a.sources)} maxLines={PROVENANCE_LINES[a.mode]} />}
      {a.handoff && <HandoffFooter certainty={a.states[0]?.certainty ?? 'provisional'} release={a.release} stateLabel={a.handoff.state} next={a.handoff.next} owner={a.handoff.owner} artifact={a.handoff.artifact} version={a.handoff.version} />}
      <Band a={a} ctx={ctx} />
    </article>
  );
}

/** @returns {{ family: string, format: {w:number,h:number|null}, pages: Array<{id:string,title:string,html:string,ground:string,alt?:string}>, warnings: string[] }} */
export function renderArtifact(a, { publicBuild = false, stamp = '' } = {}) {
  const ctx = { publicBuild, stamp };
  const warnings = [];
  const wrap = (id, title, node, ground = a.ground, extra = {}) => ({ id, title, ground, ...extra, html: renderToStaticMarkup(node) });
  let pages = [];
  try {
    switch (a.artifact) {
      case 'social': pages = [wrap('tile', a.above, <Tile a={a} ctx={ctx} above={a.above} below={a.below} lead={a.lead} form={a.form} support={a.support} w={FORMATS.social.w} h={FORMATS.social.h} index={0} count={1} />)]; break;
      case 'carousel': pages = a.panels.map((p, i) => wrap(`panel-${i + 1}`, p.above, <Tile a={a} ctx={ctx} above={p.above} below={p.below} lead={p.lead} form={p.form} support={p.support} w={FORMATS.carousel.w} h={FORMATS.carousel.h} index={i} count={a.panels.length} />)); break;
      case 'deck': pages = a.slides.map((s, i) => {
        let body;
        try { body = slideBody(s, a); } catch (e) { warnings.push(`slide ${s.id}: render error — ${e.message} — labelled fallback rendered`); body = <Fallback reason={`Render error in slide type "${s.type}"`} raw={{ id: s.id, type: s.type }} />; }
        const extra = { notes: publicBuild ? undefined : s.notes, alt: s.type === 'diagram' ? `${s.heading ?? 'diagram'} — ${diagramAlt(s.diagram)}` : undefined };
        return wrap(s.id, s.type === 'title' ? s.title : (s.heading ?? s.above ?? s.type), <Slide a={a} ctx={ctx} ground={s.ground} heading={s.heading} index={i} count={a.slides.length} sources={s.sources}>{body}</Slide>, s.ground ?? a.ground, extra);
      }); break;
      case 'diagram': pages = [wrap('diagram', a.title ?? a.above, <div className="carry-slide" style={{ width: FORMATS.diagram.w, height: FORMATS.diagram.h, padding: 'var(--pad-slide)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--gap-section)', background: 'var(--ground)', color: 'var(--ink)' }}>
        <Composition form={a.form} above={a.above} below={a.below} lead={a.lead?.text} leadLabel={a.lead ? leadLabel[a.lead.kind] : undefined} aboveSize="m" />
        <div role="img" aria-label={`${a.title ?? 'diagram'} — ${diagramAlt(a.diagram)}`} style={{ flex: 1, minHeight: 0 }}><Diagram d={a.diagram} /></div>
        {a.consequence && <ConsequenceNote who={a.consequence.who}>{a.consequence.text}</ConsequenceNote>}
        <Band a={a} ctx={ctx} />
      </div>, a.ground, { alt: `${a.title ?? 'diagram'} — ${diagramAlt(a.diagram)}` })]; break;
      case 'document': pages = [wrap('document', a.title ?? a.above, <Document a={a} ctx={ctx} />)]; break;
      default: pages = [wrap('fallback', 'Unknown artifact', <Fallback reason={`Unknown artifact family "${a.artifact}"`} raw={{ artifact: a.artifact }} />)]; warnings.push(`unknown artifact family "${a.artifact}"`);
    }
  } catch (e) {
    warnings.push(`render error — ${e.message} — labelled fallback rendered`);
    pages = [wrap('fallback', 'Render error', <Fallback reason="Render error" raw={{ artifact: a.artifact, error: e.message }} />)];
  }
  return { family: a.artifact, format: FORMATS[a.artifact] ?? FORMATS.document, pages, warnings };
}
