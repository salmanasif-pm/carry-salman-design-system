# 0003 — The threshold: one 2px rule, one ochre tick, position by mode

**State:** Locked on identity approval · **Owner:** Salman Asif · **Date:** 2026-09-11 · **Affects:** `Threshold`, `Composition`, `HandleTruth`; `tokens/shape.css` (`--stroke-threshold`, `--tick-size`), `tokens/semantic.css` (`--threshold-at`)

**Decision.** The principal visual signature is a horizontal (or vertical on 16:9) 2px ink rule with exactly one 12px ochre tick. The first read sits above the line, the exact second read below. One threshold per view. Its vertical position is a mode token: executive .62 · social .55 · personal .60 · evidence .34 · systems .28 — a high line means scan, a low line means inspect. The tick's function (`fn`) changes only the tick: decision solid at start · evidence outline · progression at end · transition centred · reflection small · separation none.

**Options considered.** A logo mark or monogram (rejected: no logo exists in any source and none was drawn; the identity is type-only). A framed card as the signature (rejected: cards are a strong-default "few", and frames invite decoration). A colour band (rejected: colour-only meaning).

**Trade-off.** One signature per view means a dense artifact needs rules and space, not more thresholds. Position by mode adds one token per mode but keeps the grammar identical across surfaces.

**Evidence and ancestry.** Brief v1.2 "Visible Handle vs Operating Truth"; Checkpoint 1 territory decision; `guidelines/brand-threshold.html`, `guidelines/space-threshold.html`.

**Risks.** On very short artifacts the line can read as a divider; `fn="separation"` exists for genuine dividers so the tick is never diluted. The draggable threshold (workspace task 4) must snap to the five positions and never invent a sixth as a default.

**Reopens if.** Identity approval; a mode whose reading pattern needs a position outside the five; evidence that the tick fails at a real display size.
