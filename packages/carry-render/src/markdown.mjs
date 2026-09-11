// Notion-compatible markdown. States travel as text ("confirmed · gated on X · owner Y"); nothing is dropped.
import { ILLUSTRATIVE_LABEL, RELEASE_TAG } from 'carry-content';
const state = (s) => s ? [s.certainty, s.gated ? `gated${typeof s.gated === 'object' && s.gated.gate ? ' on ' + s.gated.gate : ''}` : null, typeof s.gated === 'object' && s.gated.owner ? `owner ${s.gated.owner}` : null, s.release ? RELEASE_TAG[s.release] : null].filter(Boolean).join(' · ') : '';
const evidence = (rows) => rows.length ? ['| | | state |', '|---|---|---|', ...rows.map((r) => `| ${r.key} | ${r.value}${r.source ? ' · ' + r.source : ''} | ${state(r.state)} |`)].join('\n') : '';
const leadLabel = (k) => ({ decision: 'Decision underneath', recommendation: 'Recommendation', question: 'Open', refusal: 'Not doing', next: 'Next', kept: 'Kept', open: 'Open' })[k] ?? k;
const composition = (c) => [`## ${c.above}`, c.below ? `\`${c.below}\`` : '', c.lead ? `**${leadLabel(c.lead.kind)}:** ${c.lead.text}${c.lead.reopens ? `  \n_reopens if_ ${c.lead.reopens}` : ''}` : ''].filter(Boolean).join('\n\n');
export function toMarkdown(a, { stamp = '' } = {}) {
  const out = [];
  if (a.title) out.push(`# ${a.title}`);
  out.push(`_${a.content_kind === 'illustrative' ? ILLUSTRATIVE_LABEL : a.content_kind === 'verified' ? `claims register ${a.claims_register_ref}` : 'placeholder content'} · release: ${RELEASE_TAG[a.release]} · mode: ${a.mode}_`);
  out.push(composition(a));
  if (a.artifact === 'social') out.push(evidence(a.support));
  if (a.artifact === 'carousel') a.panels.forEach((p, i) => out.push(`### Panel ${i + 1}`, composition(p), evidence(p.support)));
  if (a.artifact === 'document') { a.sections.forEach((s) => out.push(s.heading ? `### ${s.heading}${s.state ? ` · ${state(s.state)}` : ''}` : '', ...s.body, evidence(s.evidence))); if (a.counterpoint) out.push(`> **What would change this:** ${a.counterpoint}`); }
  if (a.artifact === 'deck') for (const s of a.slides) {
    switch (s.type) {
      case 'title': out.push(`## ${s.title}`, s.subtitle ?? ''); break;
      case 'statement': out.push(composition(s)); break;
      case 'decision': out.push(`**${leadLabel(s.lead.kind)}:** ${s.lead.text}`, evidence(s.evidence), s.counterpoint ? `> **What would change this:** ${s.counterpoint}` : ''); break;
      case 'evidence': out.push(s.heading ? `### ${s.heading}` : '', evidence(s.evidence)); break;
      case 'table': out.push(s.heading ? `### ${s.heading}` : '', `| ${s.table.columns.map((c) => c.header).join(' | ')} |`, `|${s.table.columns.map(() => '---').join('|')}|`, ...s.table.rows.map((r) => `| ${s.table.columns.map((c) => { const v = r[c.key]; return typeof v === 'string' ? v : `${v.text} (${state(v)})`; }).join(' | ')} |`)); break;
      case 'timeline': out.push(s.heading ? `### ${s.heading}` : '', ...s.steps.map((st, i) => `${i + 1}. ${st.current ? '**' : ''}${st.label}${st.current ? '** ← current' : ''}${st.state ? ` · ${state(st.state)}` : ''}`)); break;
      case 'diagram': out.push(s.heading ? `### ${s.heading}` : '', ...s.diagram.lanes.map((l) => `- **${l.owner}**${l.boundary ? ' (boundary)' : ''}: ${l.nodes.map((n) => `${n.label} [${n.certainty}${n.gated ? ' · gated' : ''}${n.carries ? ' · carries the load' : ''}]`).join(' → ')}`), ...s.diagram.connectors.map((c) => `  - ${c.from} → ${c.to} · ${c.certainty}${c.label ? ' · ' + c.label : ''}`)); break;
      case 'consequence': out.push(`> **What this changes for ${s.consequence.who}:** ${s.consequence.text}`); break;
      case 'close': out.push('---', `**State** ${s.handoff.state} · **Next decision** ${s.handoff.next} · **Owner** ${s.handoff.owner} · **Next artifact** ${s.handoff.artifact}`); break;
    }
  }
  if (a.artifact === 'diagram') out.push(...a.diagram.lanes.map((l) => `- **${l.owner}**${l.boundary ? ' (boundary)' : ''}: ${l.nodes.map((n) => `${n.label} [${n.certainty}${n.gated ? ' · gated' : ''}${n.carries ? ' · carries the load' : ''}]`).join(' → ')}`), ...a.diagram.connectors.map((c) => `  - ${c.from} → ${c.to} · ${c.certainty}${c.label ? ' · ' + c.label : ''}`));
  if (a.consequence && a.artifact !== 'deck') out.push(`> **What this changes for ${a.consequence.who}:** ${a.consequence.text}`);
  if (a.sources.length) out.push('**Where this comes from**', ...a.sources.map((s) => `- ${s.name}${s.kind !== 'public' ? ` · ${s.kind}` : ''}${s.url ? ` · ${s.url}` : ''}`));
  if (a.handoff && a.artifact !== 'deck') out.push('---', `**State** ${a.handoff.state} · **Next decision** ${a.handoff.next} · **Owner** ${a.handoff.owner} · **Next artifact** ${a.handoff.artifact}`);
  out.push(`_${stamp}_`);
  return out.filter((l) => l !== '').join('\n\n') + '\n';
}
