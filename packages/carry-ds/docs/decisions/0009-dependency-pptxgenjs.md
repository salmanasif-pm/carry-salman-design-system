# 0009 — Dependency: pptxgenjs for native-text PPTX export

**State:** Open (tooling) · **Owner:** Salman Asif · **Date:** 2026-09-11 · **Affects:** workspace `packages/carry-render` only; nothing in the design system

**Need.** Task 5 requires deck export to PPTX with native, editable text. Rasterising slides into a PPTX would freeze the truth register and defeat the point of handing a deck over.

**Alternatives.** Hand-written OOXML (rejected: weeks of work for a zip of XML, reversal cost near zero but delivery cost high). python-pptx (rejected: second runtime in a Node workspace). Exporting PDF only (rejected: the handoff asks for PPTX). Slides via a cloud API (rejected: outputs never leave the machine by themselves; rule 9).

**Decision.** `pptxgenjs` 4.x (MIT), used only inside `carry-render/src/pptx.mjs`. It writes shapes and text; every visual value it receives is a Carry token transcribed (paper `#EFE9DF`, ink `#17181A`, ochre `#B8641C`, graphite `#1D1F22`, Instrument Sans / Geist Mono font names). Fill grammar is preserved with shapes: solid, outline, dashed-outline-with-transparent-fill for unknown, a bar for gated; release as text.

**Costs.** ~1 MB dev-time dependency, no runtime footprint in any artifact; maintenance is one export module. Accessibility: PPTX text stays selectable and readable by screen readers, which a raster would not. Export compatibility: fonts are referenced by name; a machine without Instrument Sans falls back to its default sans, which is why the PDF remains the fidelity export. Licence: MIT.

**Reversal cost.** Delete `pptx.mjs` and the `--pptx` flag; no other module depends on it.

**Reopens if.** A maintained alternative writes OOXML with fewer transitive dependencies, or PPTX stops being a required output.
