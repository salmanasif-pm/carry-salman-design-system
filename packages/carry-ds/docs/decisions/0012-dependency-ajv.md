# 0012 — Dependency: ajv for Content Brief validation

**State:** Open (tooling) · **Owner:** Salman Asif · **Date:** 2026-09-12 · **Affects:** workspace `packages/carry-content` only

**Need.** Brief §4.1 makes the JSON Schema (draft 2020-12) the source of truth for the Content Brief, and §4.2 needs a validator that reports every failure. The artifact contract elsewhere in `carry-content` is Zod-first with JSON Schema emitted; the brief inverts that, so the hand-written schema is validated directly.

**Alternatives.** Zod mirror of §6 with emitted JSON Schema (rejected: the emitted schema could not carry the if/then for `static_equivalent` or the `not` constraints, and two sources for one contract is what the brief forbids). Hand-rolled checks only (rejected: closed enums and `additionalProperties: false` across ~20 objects are exactly what a schema validator exists for).

**Decision.** `ajv` 8 (MIT), draft-2020-12 mode, strict, all errors. Used only by `bin/validate-brief.js`; the lints live in `src/brief-lint.mjs` with no dependency.

**Costs.** Dev/CLI-time only; no artifact depends on it. **Reversal cost.** Swap the compile call; the schema file is the contract either way.

**Reopens if.** The brief moves to a Zod-native contract, or ajv's licence or maintenance changes.
