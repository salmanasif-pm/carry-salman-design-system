# Carry — code home

Salman Asif's personal design system and the tooling around it. `packages/carry-ds/` is canonical
and is changed only through a `docs/decisions/` entry; everything else here is tooling that consumes
it. Standing rules for AI collaborators: `CLAUDE.md`. Package guide: `packages/carry-ds/readme.md`.

```
packages/carry-ds/      canonical design system (tokens, 21 components, 8 templates, docs, release check)
packages/carry-web/     Vite + React 18 + TypeScript site consuming carry-ds directly; hosts the interactive threshold
packages/carry-content/ content contract: Zod schema, fail-closed validator, JSON Schema, carry-validate CLI
packages/carry-elements/ portable layer: <carry-composition> custom element (no framework)
packages/carry-render/  template runner: artifact JSON → self-contained HTML → PNG 1×/2×, PDF, PPTX, markdown; mobile check
scripts/                release-gate.mjs (wraps the package's public check), check-deps.mjs
docs/plan/              implementation plan for the ten handoff tasks
docs/research/          reference-extraction matrix (firewall decisions)
.github/workflows/      release-check.yml — the gate on every push and PR
```

## Commands

```bash
pnpm install
pnpm check:release   # packages/carry-ds/scripts/release-check.js --public, with a no-silent-pass wrapper
pnpm check:deps      # no UI, CSS, icon or animation libraries; unlisted deps warn
pnpm typecheck       # .jsx sources typed by their sibling .d.ts files
pnpm build           # carry-web → packages/carry-web/dist
pnpm dev             # carry-web on Vite
pnpm render <artifact.json> --all          # dist/<name>/: index.html, png/, png@2x/, png-grey/, artifact.pdf, deck.pptx, artifact.md
pnpm render <artifact.json> --public       # public build: refuses superseded / internal / restricted and anything not approved
pnpm check:mobile <artifact.json>          # social + carousel: 360 and 320 px display, greyscale, essential text ≥ 12 px
node packages/carry-content/bin/carry-validate.mjs <artifact.json> [--public] [--json]
pnpm ci              # all of the above, in gate order
```

The public check must be run from this workspace root or through `pnpm check:release`: the script
is CommonJS and silently no-ops when Node parses it as an ES module. `scripts/release-gate.mjs`
treats a missing report as a failure.

## Status

Carry v0.9.1 · certainty of the system: provisional · release: review required until identity
approval. The public gate is currently red on the package as delivered; the findings and the
proposed fixes are in `docs/plan/implementation-plan.md` §1 and §3.

Never committed: `uploads/`, `strategy/`, `github.md`, any PureLogics or QuickTake material.
