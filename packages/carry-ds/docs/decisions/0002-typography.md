# 0002 — Typography: two registers, one family each, weight 500

**State:** Locked on identity approval · **Owner:** Salman Asif · **Date:** 2026-09-11 · **Affects:** all modes; `tokens/typography.css`, `tokens/fonts.css`, `assets/fonts/`

**Decision.** Handle register: Instrument Sans, weight 500 only, tight tracking, sizes 72 / 48 / 32 / 24. Body: Instrument Sans 17 / 1.55, measure 64ch. Truth register: Geist Mono 13 / 11.5; labels 11px uppercase tracked .08em. Decision line 22 / 1.3 medium. No serif, no bold display, no monogram. Both faces self-hosted under SIL OFL 1.1 (`assets/fonts/fonts-manifest.json`), so no public-build font switch is needed.

**Options considered.** A serif for the handle (parked as a mode-dependent choice in `docs/rules.md`: adopted only if a future long-form reading test shows a material gain). Bold display weight (rejected: "strength stays under control" is a principle; weight 500 carries it). A single family for both registers (rejected: the two registers must be told apart at a glance, and a mono second read is the exactness cue).

**Trade-off.** Weight 500 limits hierarchy inside body text; 600 is allowed there as a mode-dependent choice. Two families cost one extra font file (~30 KB each).

**Evidence and ancestry.** Brief v1.2 principle 7; Checkpoint 1; mobile readability captures in `docs/evidence/` (social evidence 40px on a 1080 source ≈ 13px at 360). `tokens/fonts.css` is marked provisional pending Checkpoint 2 pairing approval.

**Risks.** Instrument Sans has no italic in the shipped subset; emphasis is weight, not slant. Long mono strings wrap badly below 320px; the truth register is measured at 360 and 320.

**Reopens if.** Identity approval changes the pairing; a reading test justifies a serif; a licence change on either face.
