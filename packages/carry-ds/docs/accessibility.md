# Accessibility checklist

**Contrast (measured):** ink-0 on paper-1 14.6:1 · ink-2 on paper-1 7.9:1 · ink-3 on paper-1 5.0:1 · ochre-3 (signal-text) on paper-1 5.3:1 · ochre-2 (marks only) 3.9:1 — never used for text · graphite-ink on graphite-0 13.8:1 · ochre-1 on graphite-0 8.7:1.

Per artifact:
- [ ] Meaning never by colour alone — certainty is fill, gate is a bar, release is a word.
- [ ] Social graphics: essential evidence ≥ 36–42px on a 1080 source (≥ 12–14px displayed at 360px); screenshot-tested at 360px and 320px and in greyscale.
- [ ] Ochre appears once (tick) plus the decision prefix; never as body text at ochre-2.
- [ ] Body ≥ 15px (documents), ≥ 24px (1080 slides / 1920 decks), truth register ≥ 11.5px / ≥ 22px on slides.
- [ ] Measure ≤ 80ch; line-height ≥ 1.45 for body.
- [ ] Focus visible (2px ochre outline); hit targets ≥ 44px.
- [ ] Reduced motion honoured — durations collapse to 0; artifact reads identically static.
- [ ] Diagrams: Legend present; alt text follows the pattern *"[what] — n confirmed, n provisional, n unknown; n gated; load carried by [node]"*.
- [ ] Tables use role=table/rowheader semantics (Matrix does).
- [ ] Small-screen test: key idea survives at 360px (social/carousel are fixed-size images; documents reflow).
- [ ] Print: graphite sections invert to white/ink via `@media print` in `tokens/base.css` (implemented v0.9.1; verify in the browser print preview per artifact).