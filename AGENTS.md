# Carry — instructions for coding and content agents

Read `CLAUDE.md` first (standing rules, short). This file is the workspace map. Everything you need to
produce a Carry artifact without reading the repository is in three places:

1. **The contract** — `packages/carry-content/schema/artifact.v1.json` (JSON Schema) or the Zod source in
   `packages/carry-content/src/schema.ts`. Five families: `social`, `carousel`, `deck`, `document`, `diagram`.
   Every artifact has `form` (one of seven), `above`, `below`, a `lead` (except observation-development),
   `content_kind` (`placeholder` · `illustrative` · `verified` + `claims_register_ref`), `release`, and states
   with three independent axes: `certainty` (`confirmed` · `provisional` · `unknown`; `superseded` history
   only), `gated` (`{gate, owner, clears, review?}`), `release` (`internal` · `review` · `approved` · `restricted`).
2. **Examples** — `packages/carry-content/examples/*.placeholder.json`, one per family, all `[placeholder]`.
3. **The tools** — run from the repo root after `pnpm install`:
   ```
   node packages/carry-content/bin/carry-validate.mjs <artifact.json> [--public] [--json] [--claims content/claims.json]
   pnpm render <artifact.json> --all          # dist/<name>/: index.html, png/, png@2x/, png-grey/, artifact.pdf, deck.pptx (decks), artifact.md
   pnpm check:mobile <artifact.json>          # social + carousel: 360 / 320 px display, greyscale, essential text ≥ 12 px
   pnpm check:release                         # the public gate; must pass before anything leaves
   ```
   Validation errors are structured `{path, code, message}`. Fix the content; never patch the validator to pass.

## What you must not do
- Invent evidence, figures, clients, contact details or sources. Content is `[placeholder]`, labelled
  `illustrative example — not Salman evidence` (`content_kind: illustrative`), or Claims-Register wording
  (`content_kind: verified` with a `claims_register_ref` that exists in `content/claims.json`).
- Add, rename, soften or collapse a state value. Unknown stays Unknown. Approval never confirms.
- Change anything in `packages/carry-ds/` (tokens, components, templates, docs) without a
  `packages/carry-ds/docs/decisions/NNNN-*.md` entry. Tooling changes elsewhere need no entry.
- Add a UI, CSS, icon or animation library. `pnpm check:deps` enforces the allowlist.
- Commit `uploads/`, `strategy/`, `github.md`, or anything from PureLogics or QuickTake.

## Where things live
```
packages/carry-ds/        canonical design system — read its readme.md, docs/rules.md, docs/state-architecture.md
packages/carry-content/   contract + validator + JSON Schema + carry-validate + claims-sync
packages/carry-render/    artifact JSON → self-contained HTML → PNG / PDF / PPTX / markdown; mobile check
packages/carry-elements/  <carry-composition> custom element (no framework)
packages/carry-web/       Vite + React site: scaffold page, interactive threshold, Ladle stories (pnpm --filter carry-web stories)
content/claims.json       approved Claims-Register wording (written only by claims-sync)
docs/plan/                task status; docs/research/ reference-extraction matrix
```
The presentation engine at `salmanasif-pm/quicktake-design-system` vendors `packages/carry-ds` (commit `9b31015`, branch
`release/carry-v0.9.1`) and renders Carry decks with `system: carry`; its contract is
`packages/carry-ds/docs/engine-integration.md`.
