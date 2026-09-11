# Governance — ownership, sync, fallback, rollback, reconciliation, exceptions

## Layers (keep distinct)
1. **Identity** — principles, north star, truth vocabulary, the threshold device. Owner: Salman. State: *Locked* after identity approval. Reopens only with new evidence, a changed constraint, or Salman's explicit decision.
2. **Grammar** — tokens, components, modes, voice patterns. Owner: Salman; AI proposes. State: *Open* during v0.x.
3. **Application** — templates, engine adapters, Notion/web guidance. Owner: whoever ships the artifact. Replaceable.

## Decision trace
Every meaningful change records: decision · options considered · trade-off · evidence/ancestry · risks · what would reopen it · owner · date · affected modes/components. Trace lives in `strategy/` (this build's trace: Phase A + Checkpoint 1) and, from v1.0, in `docs/decisions/NNNN-*.md` with Locked / Open / Superseded states. Superseded entries are kept, never deleted.

## AI ↔ human boundary (from the brief §26)
- AI alone: organise references, generate variants, consistency checks, accessibility checks, scaffold from approved tokens.
- AI proposes, Salman confirms: palette/type, motifs, modes, component and diagram patterns, reuse of prior-system mechanisms.
- Human with AI input: territory selection, personal authenticity, fitness imagery, "does this feel like me", trade-offs.
- **Human only (Salman):** identity approval, authorisation to reuse PureLogics/QuickTake material, publication, approval of claims/evidence/imagery, licensing, reopening a locked principle. **Gated → actionable and review → approved are always a named human's act; neither changes certainty.**

## Sync (design system → consumers/engine)
- Source of truth is this project. Each release is tagged `carry-vX.Y` and exported as a zip; the engine vendors it into `vendor/carry-ds/` and refreshes `vendor.lock.json`.
- Consuming design projects bind the same tag. Never edit a vendored copy; propose changes here.
- One-click sync from the engine repo uses `github.md` (Screen map) to rebuild only affected docs.

## Fallback
- Fonts: Instrument Sans → system-ui; Geist Mono → ui-monospace. Both are OFL, so no licence switch is needed.
- Missing image → `image-slot` placeholder with its rule text; never a broken image.
- Unknown certainty or release key → visible **invalid** mark in the DS; **build failure** in the engine. Never a silent substitution.
- Every distributable build runs `scripts/release-check.js --public` first; a failure blocks the zip.
- Unknown template/slide type → labelled fallback panel (engine) — never blank.

## Rollback
- Each tagged release is immutable. Roll back by re-pinning the previous tag in `vendor.lock.json` / the consumer binding. Artifacts stamp the DS version they were built with (engine rule 7), so any output can be reproduced.

## Reconciliation
- When two artifacts disagree on a state or figure, the one with the later `Provenance.version` and a human confirmation wins; the older is marked *Superseded*, not deleted.
- Token drift between a consumer's overrides and this project is reconciled here, never in the consumer. A consumer override is an exception (below).

## Exceptions
An exception is a documented deviation: `docs/exceptions/NNNN.md` with reason, scope (artifact/mode), expiry, owner. Allowed: local density, threshold position, provenance lines. **Never excepted:** a second accent hue, colour-only state, bold display type, a decision-free artifact, fitness costume, monogram.

## Measurement and review (brief §24 Stage 7)
Indicators: recognition without the wordmark · correct reproduction by another AI from SKILL.md alone · time-to-next-artifact · number of manual corrections · small-screen comprehension · qualified inbound language. Not indicators: likes, reach, novelty. **Next review: 30 days after identity approval, or on the first external publication — whichever is first.**

## Confidentiality
Case studies default to sanitised (`client unnamed`). Restricted sources are named as *internal* or *restricted* in `Provenance`, never linked. Nothing from PureLogics/QuickTake brand or client material enters the distributable; `uploads/` stays in the internal package only (`docs/package-manifest.md`). External claim wording comes only from the Claims & Verification Register; the current résumé (9 Sep 2026) is the canonical positioning text.