# Handoff to Claude Code — Carry v0.9.1

## What to hand over
From the project zip, copy into the new repo as `packages/carry-ds/`:
```
readme.md  SKILL.md  CLAUDE.md  styles.css  thumbnail.html
tokens/  assets/  components/  guidelines/  templates/  docs/  scripts/
_ds_bundle.js  _ds_manifest.json  _adherence.oxlintrc.json
```
**Do not commit:** `uploads/` (third-party reference systems — restricted), `strategy/` (internal decision history), `github.md`, `dist/`. Run `node packages/carry-ds/scripts/release-check.js --public` before the first push.

## Opening brief (paste into Claude Code)
> This repo is the code home for **Carry**, Salman Asif's personal design system. `packages/carry-ds/` is canonical — read `SKILL.md`, `readme.md`, `docs/rules.md`, `docs/state-architecture.md` and `docs/engine-integration.md` before writing anything. Invariants in `docs/rules.md` are non-negotiable. Never change token values or component semantics without a `docs/decisions/NNNN-*.md` entry naming what would reopen it. Never add evidence, figures, clients or contact details — content is `[placeholder]`, labelled *illustrative example — not Salman evidence*, or Claims-Register wording. Enhance the tooling, not the identity. Related engine: `github.com/salmanasif-pm/quicktake-design-system` — Carry becomes its third vendor per `docs/engine-integration.md`.

## Repo layout
```
carry/
  packages/carry-ds/          ← this package, canonical, vendored read-only by others
  packages/carry-content/     ← JSON content schema + validator (engine-integration §2)
  packages/carry-web/         ← React/Vite site: interactive Composition, live templates
  packages/carry-render/      ← content → PNG / PDF / PPTX / Notion-markdown
  docs/decisions/             ← decision trace (Locked / Open / Superseded)
  .github/workflows/          ← release-check + public-build gate on every PR
```

## Task list, in order
1. **Scaffold** — pnpm workspace, Vite + React 18, TypeScript. Import `packages/carry-ds/styles.css`; consume components via `_ds_bundle.js` or transpile the `.jsx` sources directly.
2. **CI gate** — workflow runs `scripts/release-check.js --public`; fails PRs on restricted terms, placeholder identity, operating-only states.
3. **`carry-content` schema** — Zod/JSON-Schema for `{form, content_kind, lead, states[{certainty, gated{gate,owner,clears,review}, release}], provenance, handoff}`. Validator fails on unknown keys, missing lead (except observation-development), `verified` without `claims_register_ref`, public build without `release: approved`.
4. **Interactive Composition** — web component where the threshold is draggable; position maps to `--threshold-at` and re-flows the second register (executive .62 → systems .28). Keyboard accessible; snaps to the five modes.
5. **Template runner** — load a content JSON, choose a template, render at 1080², 1080×1350, 1920×1080, letter. Export PNG (1× and 2×), PDF (uses `@media print` inversion), PPTX (native text).
6. **Mobile check** — automated Playwright screenshot at 360 and 320px display width + greyscale for every social artifact; fail if any essential-evidence node computes below 12px displayed.
7. **Engine vendor** — `vendor/carry-ds/` in `quicktake-design-system`, `vendor.lock.json` hashes, `system: carry` contract, new slide types (`decision`, `evidence`, `consequence`), disabled `count-up` / `flow-pulse`.
8. **Storybook/Ladle** — all 21 components with certainty · gated · release as controls; the seven forms as stories.
9. **Claims Register sync (optional)** — Notion API pull of approved wording into `content/claims.json`; verified templates reference rows by id.
10. **Decisions** — first entries: 0001 palette · 0002 typography · 0003 threshold · 0004 three-axis states · 0005 composition family · 0006 rule hierarchy. Mark 0001–0003 *Locked on identity approval*.

## What stays in the design tool
Visual decisions, new templates and cards, identity approval. Code-side token or component changes come back to the design project so the compiled bundle stays canonical.
