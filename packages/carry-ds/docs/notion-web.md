# Notion and web guidance

## Notion (where the OS lives)
Notion cannot load fonts or tokens. Carry survives there by grammar, not styling:
- **Threshold** → a divider block preceded by a one-line handle (H1) and followed by a `code`-styled truth line. The ochre tick is implied; do not add emoji.
- **States** → inline code with the word: `confirmed` `provisional` `unknown`; a gate as `gated · legal review · owner`; release as `approved` / `review required`. Never coloured text, never emoji circles.
- **Source links** → Notion `src` toggles may link internal pages. Anything exported outside Notion names the source as *internal* and drops the link (Provenance does this by default).
- **Decision line** → a callout with no icon, grey background, starting with **Decision:** / **Recommendation:** / **Question:** / **Refusal:**.
- **Handoff footer** → a 4-column simple table: state · next decision · owner · next artifact.
- **Provenance** → toggle titled `src` at the bottom.
- Page icons: none. Covers: none. Colours: default grey only.

## Web (future site / portfolio)
- Link `styles.css`; set `data-carry-mode` on `<main>`; components from the bundle.
- One threshold per view; everything above it fits the first viewport at 1280 and 390 wide.
- Navigation is a truth-register line, not a bar: `work · writing · training · contact` in Geist Mono 13px.
- No hero imagery. No gradients. Graphite only for a closing section.
- Buttons: `Button` primary/secondary; `signal` variant for the single ask per page.