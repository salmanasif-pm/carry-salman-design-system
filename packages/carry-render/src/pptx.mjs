// Deck → PPTX with native text. Shapes carry the grammar (one rule, one ochre tick, fill marks); no rasterised slides.
import pptxgen from 'pptxgenjs';
import { ILLUSTRATIVE_LABEL, RELEASE_TAG } from 'carry-content';

const INK = '17181A', PAPER = 'EFE9DF', INK3 = '6E685C', OCHRE = 'B8641C', OCHRE_TEXT = '8C4A12', GRAPHITE = '1D1F22', GRAPHITE_INK = 'EFE9DF';
const HANDLE = 'Instrument Sans', TRUTH = 'Geist Mono';
const W = 13.333, H = 7.5, M = 0.67; // LAYOUT_WIDE inches; 96px margin ≈ 0.67in

export async function deckToPptx(a, { stamp = '', outFile }) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE'; pres.author = 'Salman Asif'; pres.title = a.title ?? a.above;
  const kindLabel = a.content_kind === 'illustrative' ? ILLUSTRATIVE_LABEL : a.content_kind === 'verified' ? `claims register ${a.claims_register_ref}` : 'placeholder content';
  for (const [i, s] of a.slides.entries()) {
    const graphite = (s.ground ?? a.ground) === 'graphite';
    const ink = graphite ? GRAPHITE_INK : INK, ink3 = graphite ? 'B9B3A7' : INK3;
    const slide = pres.addSlide(); slide.background = { color: graphite ? GRAPHITE : PAPER };
    const band = (txt, x, w, align = 'left') => slide.addText(txt, { x, y: H - M + 0.15, w, h: 0.3, fontFace: TRUTH, fontSize: 8, color: ink3, align, charSpacing: 1.5 });
    band(kindLabel.toUpperCase(), M, 5); band(`RELEASE · ${RELEASE_TAG[a.release].toUpperCase()}`, W / 2 - 2, 4, 'center'); band(stamp.toUpperCase(), W - M - 5, 5, 'right');
    slide.addText(`${(a.title ?? '').toUpperCase()}${s.heading ? ' · ' + s.heading.toUpperCase() : ''}`, { x: M, y: 0.35, w: W - 2 * M - 1, h: 0.3, fontFace: TRUTH, fontSize: 9, color: ink3, charSpacing: 1.5 });
    slide.addText(`${i + 1} / ${a.slides.length}`, { x: W - M - 1, y: 0.35, w: 1, h: 0.3, fontFace: TRUTH, fontSize: 9, color: ink3, align: 'right' });
    const rule = (y, tick = 'start') => { slide.addShape(pres.ShapeType.rect, { x: M, y, w: W - 2 * M, h: 0.03, fill: { color: ink }, line: { color: ink, width: 0 } }); if (tick !== 'none') slide.addShape(pres.ShapeType.rect, { x: tick === 'end' ? W - M - 0.17 : M, y: y - 0.07, w: 0.17, h: 0.17, fill: { color: OCHRE }, line: { color: OCHRE, width: 0 } }); };
    const mark = (x, y, certainty, gated) => {
      const o = { x, y, w: 0.16, h: 0.16 };
      if (certainty === 'confirmed') slide.addShape(pres.ShapeType.rect, { ...o, fill: { color: ink }, line: { color: ink, width: 0 } });
      else if (certainty === 'unknown') slide.addShape(pres.ShapeType.rect, { ...o, fill: { type: 'solid', color: ink, transparency: 60 }, line: { color: ink, width: 1, dashType: 'sysDash' } });
      else slide.addShape(pres.ShapeType.rect, { ...o, fill: { type: 'none' }, line: { color: ink, width: 1.25 } });
      if (gated) slide.addShape(pres.ShapeType.rect, { x: x - 0.03, y: y + 0.065, w: 0.22, h: 0.035, fill: { color: ink }, line: { color: ink, width: 0 } });
    };
    const evidence = (rows, y0) => rows.forEach((r, j) => { const y = y0 + j * 0.42; if (r.state) mark(M, y + 0.08, r.state.certainty, r.state.gated); slide.addText([{ text: `${r.key}  `, options: { color: ink3 } }, { text: r.value, options: { color: ink } }, ...(r.state?.release ? [{ text: `   ${RELEASE_TAG[r.state.release].toUpperCase()}`, options: { color: ink3, fontSize: 9 } }] : [])], { x: M + 0.35, y, w: W - 2 * M - 0.35, h: 0.4, fontFace: TRUTH, fontSize: 13, valign: 'top' }); });
    const label = (txt, y) => slide.addText(txt.toUpperCase(), { x: M, y, w: 6, h: 0.25, fontFace: TRUTH, fontSize: 8, color: ink3, charSpacing: 1.5 });
    switch (s.type) {
      case 'title': slide.addText('Salman Asif', { x: M, y: 1.2, w: 8, h: 0.6, fontFace: HANDLE, fontSize: 24, color: ink }); slide.addText(s.title, { x: M, y: 2.2, w: W - 2 * M, h: 2, fontFace: HANDLE, fontSize: 54, color: ink, valign: 'top' }); rule(4.5, 'none'); if (s.subtitle) slide.addText(s.subtitle, { x: M, y: 4.7, w: W - 2 * M, h: 0.6, fontFace: HANDLE, fontSize: 18, color: ink }); break;
      case 'statement': {
        const half = (W - 2 * M) / 2 - 0.4;
        slide.addText(s.above, { x: M, y: 1.4, w: half, h: 4.4, fontFace: HANDLE, fontSize: 40, color: ink, valign: 'bottom' });
        slide.addShape(pres.ShapeType.rect, { x: W / 2 - 0.015, y: 1.2, w: 0.03, h: 4.8, fill: { color: ink }, line: { color: ink, width: 0 } });
        slide.addShape(pres.ShapeType.rect, { x: W / 2 - 0.085, y: 1.2, w: 0.17, h: 0.17, fill: { color: OCHRE }, line: { color: OCHRE, width: 0 } });
        if (s.below) slide.addText(s.below, { x: W / 2 + 0.4, y: 1.4, w: half, h: 2.4, fontFace: TRUTH, fontSize: 14, color: ink, valign: 'top' });
        if (s.lead) slide.addText([{ text: `${leadLabel(s.lead.kind)}: `, options: { color: OCHRE_TEXT } }, { text: s.lead.text, options: { color: ink } }], { x: W / 2 + 0.4, y: 4.0, w: half, h: 1.6, fontFace: HANDLE, fontSize: 20, valign: 'top' });
        break;
      }
      case 'decision': slide.addText([{ text: `${leadLabel(s.lead.kind)}: `, options: { color: OCHRE_TEXT } }, { text: s.lead.text, options: { color: ink } }], { x: M, y: 1.2, w: W - 2 * M, h: 1.6, fontFace: HANDLE, fontSize: 28, valign: 'top' }); if (s.lead.reopens) slide.addText(`reopens if · ${s.lead.reopens}`, { x: M, y: 2.8, w: W - 2 * M, h: 0.35, fontFace: TRUTH, fontSize: 11, color: ink3 }); rule(3.3); evidence(s.evidence, 3.6); if (s.counterpoint) { slide.addShape(pres.ShapeType.rect, { x: M, y: 5.9, w: 0.03, h: 0.8, fill: { color: ink }, line: { color: ink, width: 0 } }); slide.addText([{ text: 'WHAT WOULD CHANGE THIS  ', options: { color: ink3, fontSize: 8, fontFace: TRUTH } }, { text: s.counterpoint, options: { color: ink } }], { x: M + 0.2, y: 5.9, w: W - 2 * M - 0.2, h: 0.8, fontFace: HANDLE, fontSize: 14, valign: 'top' }); } break;
      case 'evidence': if (s.heading) slide.addText(s.heading, { x: M, y: 1.2, w: W - 2 * M, h: 0.9, fontFace: HANDLE, fontSize: 32, color: ink }); rule(2.3, 'start'); evidence(s.evidence, 2.6); break;
      case 'table': { if (s.heading) slide.addText(s.heading, { x: M, y: 1.2, w: W - 2 * M, h: 0.8, fontFace: HANDLE, fontSize: 28, color: ink }); const head = s.table.columns.map((c) => ({ text: c.header, options: { bold: false, color: ink3, fontFace: TRUTH, fontSize: 9 } })); const rows = s.table.rows.map((r) => s.table.columns.map((c) => { const v = r[c.key]; return { text: typeof v === 'string' ? v : `${v.text}  (${v.certainty}${v.gated ? ' · gated' : ''})`, options: { fontFace: TRUTH, fontSize: 11, color: ink } }; })); slide.addTable([head, ...rows], { x: M, y: 2.2, w: W - 2 * M, border: { type: 'solid', pt: 0.5, color: 'D6D0C4' }, fill: { color: graphite ? GRAPHITE : PAPER } }); break; }
      case 'timeline': if (s.heading) slide.addText(s.heading, { x: M, y: 1.2, w: W - 2 * M, h: 0.8, fontFace: HANDLE, fontSize: 28, color: ink }); rule(2.3, 'end'); s.steps.forEach((st, j) => { const x = M + j * ((W - 2 * M) / s.steps.length); mark(x, 3.0, st.state?.certainty ?? 'provisional', st.state?.gated); if (st.current) slide.addShape(pres.ShapeType.rect, { x: x - 0.06, y: 2.94, w: 0.28, h: 0.28, fill: { type: 'none' }, line: { color: OCHRE, width: 1.5 } }); slide.addText(st.label, { x, y: 3.3, w: (W - 2 * M) / s.steps.length - 0.2, h: 0.8, fontFace: TRUTH, fontSize: 12, color: ink, valign: 'top' }); }); break;
      case 'consequence': slide.addShape(pres.ShapeType.rect, { x: M, y: 2.2, w: W - 2 * M, h: 2.6, fill: { color: graphite ? '26282C' : 'E6DFD2' }, line: { color: graphite ? '26282C' : 'E6DFD2', width: 0 } }); label(`what this changes for ${s.consequence.who}`, 2.4); slide.addText(s.consequence.text, { x: M + 0.3, y: 2.8, w: W - 2 * M - 0.6, h: 1.8, fontFace: HANDLE, fontSize: 22, color: ink, valign: 'top' }); break;
      case 'close': rule(4.3, 'none'); [['state', s.handoff.state], ['next decision', s.handoff.next], ['owner', s.handoff.owner], ['next artifact', s.handoff.artifact]].forEach(([k, v], j) => { const x = M + j * ((W - 2 * M) / 4); label(k, 4.5); slide.addText(v, { x, y: 4.8, w: (W - 2 * M) / 4 - 0.2, h: 0.8, fontFace: TRUTH, fontSize: 12, color: ink, valign: 'top' }); slide.addText(k.toUpperCase(), { x, y: 4.5, w: 3, h: 0.25, fontFace: TRUTH, fontSize: 8, color: ink3, charSpacing: 1.5 }); }); slide.addText('Salman Asif', { x: M, y: 6.0, w: 6, h: 0.5, fontFace: HANDLE, fontSize: 16, color: ink }); break;
      case 'diagram': if (s.heading) slide.addText(s.heading, { x: M, y: 1.2, w: W - 2 * M, h: 0.8, fontFace: HANDLE, fontSize: 28, color: ink }); s.diagram.lanes.forEach((l, li) => { const y = 2.3 + li * 1.7; slide.addText(l.owner.toUpperCase(), { x: M, y, w: 6, h: 0.25, fontFace: TRUTH, fontSize: 8, color: ink3, charSpacing: 1.5 }); slide.addShape(pres.ShapeType.rect, { x: M, y: y + 0.3, w: W - 2 * M, h: 0.02, fill: { color: 'D6D0C4' }, line: { color: 'D6D0C4', width: 0, dashType: l.boundary ? 'dash' : 'solid' } }); l.nodes.forEach((n, ni) => { const x = M + ni * 3.0; slide.addShape(pres.ShapeType.rect, { x, y: y + 0.45, w: 2.6, h: 0.9, fill: { type: 'none' }, line: { color: ink, width: n.carries ? 2 : 1, dashType: n.certainty === 'confirmed' ? 'solid' : n.certainty === 'provisional' ? 'dash' : 'sysDot' } }); mark(x + 0.1, y + 0.55, n.certainty, n.gated); slide.addText(n.label, { x: x + 0.35, y: y + 0.5, w: 2.2, h: 0.8, fontFace: TRUTH, fontSize: 11, color: ink, valign: 'top' }); }); }); slide.addText(s.diagram.connectors.map((c) => `${c.from} → ${c.to} · ${c.certainty}${c.label ? ' · ' + c.label : ''}`).join('\n'), { x: M, y: H - 2.0, w: W - 2 * M, h: 1.1, fontFace: TRUTH, fontSize: 9, color: ink3, valign: 'top' }); break;
      default: slide.addText(`Unknown slide type "${s.type}" — not rendered; nothing invented in its place.`, { x: M, y: 2, w: W - 2 * M, h: 1, fontFace: HANDLE, fontSize: 20, color: ink });
    }
    if (s.notes) slide.addNotes(s.notes);
  }
  await pres.writeFile({ fileName: outFile });
  return outFile;
}
const leadLabel = (k) => ({ decision: 'Decision underneath', recommendation: 'Recommendation', question: 'Open', refusal: 'Not doing', next: 'Next', kept: 'Kept', open: 'Open' })[k] ?? k;
