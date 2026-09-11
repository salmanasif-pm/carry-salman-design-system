# Carry — code home

Salman Asif's personal design system and the tooling around it. `packages/carry-ds/` is canonical
and is changed only through a `docs/decisions/` entry; everything else here is tooling that consumes
it. Standing rules for AI collaborators: `CLAUDE.md`. Package guide: `packages/carry-ds/readme.md`.

```
packages/carry-ds/      canonical design system (tokens, 21 components, 8 templates, docs, release check)
packages/carry-web/     Vite + React 18 + TypeScript site consuming carry-ds directly
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
