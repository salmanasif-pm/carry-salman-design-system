# 0011 — Content-brief alignment (v0.9.2)

**State:** Open (grammar layer) · **Owner:** Salman Asif · **Date:** 2026-09-12 (design-side decisions accepted 2026-09-13 per `CODEBASE_UPDATES_v0.9.2.md`) · **Affects:** `StateMark`, `Matrix`, new `ReportBack` and `InternalWatermark`, `tokens/shape.css`, `scripts/release-check.cjs`, `scripts/banned-vocabulary.json`, `docs/state-architecture.md`

Numbered 0011 because 0007 (the number the update file names) was already taken by the release-gate hardening entry.

**Decision.** The three items accepted on the design side:
1. The content brief's `certainty` vocabulary maps onto the existing three axes through `BRIEF_CERTAINTY`, with three provisional *variants* (inferred · assumed · proposed) rendered as label, dotted outline and horizontal hatch. No fourth axis, no new certainty value.
2. Public renders use plain wording (`wording="plain"`): working view · not yet settled · waiting on …; the fill grammar carries the meaning regardless of words. A banned-vocabulary list owned by the content side is checked by the public release gate.
3. Two components: `ReportBack` (three fixed sections, the third never hidden) and `InternalWatermark` (ink-only overlay for gate failures, no hide prop). The gate has no override.

**Options considered.** A fourth axis for brief certainty (rejected: 0004 stands; variants are sub-forms of provisional). Rewording labels in the components by default (rejected: internal artifacts keep system vocabulary; plain wording is opt-in per render). A dismissible watermark (rejected: a watermark that can be removed is not a gate).

**Trade-off.** Two more components and one more prop on two others; the truth register gains a public voice without a second meaning layer.

**Reopens if.** The content side changes the schema's `certainty` vocabulary or the banned list's semantics (adding terms does not reopen it; the list is data).
