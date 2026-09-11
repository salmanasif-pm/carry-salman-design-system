# Carry platform — implementation plan (awaiting approval)

Status: provisional · release: internal · owner: Salman Asif · author: Claude Code · date: 2026-09-11

This plan covers the ten tasks in `packages/carry-ds/docs/handoff-claude-code.md`, with tasks 1 and 2
specified in full. Nothing in `packages/carry-ds/` has been modified beyond the three import steps
requested in `README-FIRST.md`. Every item marked **[approval]** touches the canonical package or
an identity decision and waits for Salman.

## 0. Where the code lives — decision needed

The handoff describes a **new repository** (`carry/`), and task 7 treats
`quicktake-design-system` as a separate target that vendors Carry. The only repository this session
can push to is `quicktake-design-system`, and its root `CLAUDE.md` is the engine's standing law, so
"rename `CLAUDE.md.txt` → `CLAUDE.md` at the root" cannot mean that root.

Staged as: `quicktake-design-system/carry/` on branch `claude/festive-curie-882m3c`, a
self-contained subtree with its own `CLAUDE.md`, `packages/`, `docs/`. It has no reference into the
engine's `src/`, `vendor/` or `content/` (see `docs/research/reference-extraction-matrix.md`).

Options:
- **A (recommended)** — create the `carry` repository under `salmanasif-pm` and move this subtree
  there (`git subtree split` keeps history). The engine repo then vendors a tagged release (task 7).
- **B** — keep `carry/` inside the engine repo permanently. Cheaper today, but it puts a canonical
  design system next to two read-only vendored ones and makes "vendor Carry into the engine" a
  copy within one repo.

## 1. Findings from the import

1. **`scripts/release-check.js --public` fails on the package as delivered: 24 findings.** The
   package manifest records that the script had never been run under Node. Breakdown:
   - 21 in `docs/delta-report-v0.9.1.md` — the *removal ledger* quotes every banned string it
     removed, and the script has no allow-list for it. Not a leak; a scanner gap.
   - `assets/fonts/fonts-manifest.json` — the Geist Mono source line cites the engine repo as
     the download path (`via salmanasif-pm/quicktake-design-system src/assets/fonts`). Attribution
     text, not brand material, but the restricted-name rule has no allow-list entry for it.
   - `docs/handoff-claude-code.md` — names the engine repo twice; not allow-listed.
   - `templates/proposal-document/ProposalDocument.dc.html` — the `HandoffFooter` declares
     `release="internal"`. The template is a neutral-placeholder draft, so `internal` is the honest
     state, but the public check forbids it outside demo files.
   None is a content leak. All four fixes touch `packages/carry-ds/` → **[approval]**, options in §3.
2. **The gate is a silent pass inside any ESM scope.** The script opens with a browser-context
   guard (`typeof require === 'undefined' → no-op`). The engine repo's `package.json` declares
   `"type": "module"`, so Node parsed the script as ESM, `require` was undefined, and the script
   exited 0 with no output. Reproduced: adding a nearer CommonJS `package.json` restores the 24
   failures. The CI gate (task 2) must therefore run the script in a CommonJS scope **and assert
   that the report header was printed**; silence is a failure. Long-term fix (rename to `.cjs` or
   fail loud in the guard) is a package change → **[approval]**.
3. The 62 component files (21 × `.jsx` + `.d.ts` + `.prompt.md`, plus 5 cards) scan clean once
   un-suffixed; the eight template `.thumbnail` files carried over.
4. `README-FIRST.md` was not copied: its four steps are executed and its content is repeated in
   `docs/handoff-claude-code.md`.

## 2. Task 1 — workspace scaffold (no package changes)

Files, all outside `packages/carry-ds/`:
- `carry/pnpm-workspace.yaml` — `packages/*`.
- `carry/package.json` — private, **no `"type"` field** (keeps `packages/carry-ds/scripts/*.js`
  CommonJS), `engines.node >= 20`, scripts: `check:release`, `check:deps`, `typecheck`, `test`,
  `dev`, `build`. pnpm pinned via `packageManager`.
- `carry/tsconfig.base.json` — strict, `jsx: react-jsx`, `allowJs` so the `.jsx` sources compile
  with their sibling `.d.ts` files.
- `carry/packages/carry-web/` — Vite + React 18 + TypeScript app. Imports
  `../carry-ds/styles.css`; consumes components by transpiling the `.jsx` sources directly (the
  `_ds_bundle.js` global remains the path for non-bundled HTML). First page: the 21 components
  rendered with `[placeholder]` content, mode switch via `data-carry-mode`, graphite ground only
  in `personal`. No identity decisions; tokens are consumed, never redefined.
- `carry/scripts/check-deps.mjs` — fails on any UI/CSS/animation library in any workspace
  `package.json` (React, Vite, TypeScript, Playwright, Zod, Vitest allowed).
- `carry/.gitignore` — `node_modules/`, `dist/`, `uploads/`, `strategy/`, `github.md`.
- `carry/README.md` — workspace map and the two-command workflow.

Open questions for task 1 (defaults chosen if unanswered): pnpm + plain workspaces, no Turborepo
until there are more than three packages; Vitest as test runner; React 18.3 to match the engine.

## 3. Task 2 — CI gate

- `.github/workflows/carry-release-check.yml` at the **engine repo root** (the only place GitHub
  reads workflows while Carry is staged here), scoped with `paths: [carry/**]`. Under option A it
  moves to `carry/.github/workflows/`.
- Steps: checkout → Node 20 → `pnpm install --frozen-lockfile` → `node scripts/release-gate.mjs`.
- `carry/scripts/release-gate.mjs` runs `packages/carry-ds/scripts/release-check.js --public` as a
  child process **from the `carry/` CommonJS scope**, captures stdout, and fails the job unless the
  output begins with `Carry release check —` and ends with `clean`. It also fails if
  `uploads/`, `strategy/` or `github.md` exist anywhere under `carry/`.
- The gate is red until the four findings in §1.1 are resolved. Proposed resolutions, each a
  one-line package edit plus a `docs/decisions/` entry, **[approval]**:
  1. Add `docs/delta-report-v0.9.1.md` and `docs/handoff-claude-code.md` to the script's
     allow-lists (`RESTRICTED_ALLOW`; a new `LEDGER_ALLOW` for `BANNED`/`CLAIMS_BANNED`/
     `PLACEHOLDER` on the ledger only). Alternative: move the ledger to `strategy/` (not committed).
  2. Add `assets/fonts/fonts-manifest.json` to `RESTRICTED_ALLOW`, or shorten its source note
     to the gstatic URL only.
  3. `ProposalDocument`: change the footer to `release="review"` (a draft awaiting a named
     approver is exactly "review required"), or add the template to `ALLOW_OPERATING_DEMO`.
     Recommendation: `review` — it is the truer state and keeps public builds honest.
  4. Rename `release-check.js` → `release-check.cjs` and make the guard exit non-zero outside
     Node, so the gate can never pass by accident.

## 4. Tasks 3–10 — sequencing and scope

| # | Task | Where | Depends on | Notes |
|---|---|---|---|---|
| 3 | `carry-content` schema + validator | `packages/carry-content/` | 1 | Zod schema, JSON Schema emitted from it; fail-closed per engine-integration §2. Vitest table tests for every rule. |
| 10 | Decisions 0001–0006 | `packages/carry-ds/docs/decisions/` | — | Written from the readme, rules and delta report; **[approval]** to add files inside the package. 0001–0003 marked *Locked on identity approval*. Pulled forward: every §3 fix needs a decision entry. |
| 4 | Interactive Composition | `packages/carry-web/` (custom element + React wrapper) | 1, 3 | Draggable threshold → `--threshold-at`; keyboard; snaps to the five mode positions. No token change. |
| 5 | Template runner | `packages/carry-render/` | 3, 4 | Playwright HTML→PNG (1×, 2×)/PDF; PPTX via `pptxgenjs` only after the dependency decision record. |
| 6 | Mobile check | `packages/carry-render/` | 5 | 360/320 + greyscale captures; fail when essential evidence computes < 12px. |
| 8 | Storybook/Ladle | `packages/carry-web/` or `apps/stories` | 1 | Ladle preferred (lighter); 21 components × three state axes; seven forms. |
| 7 | Engine vendor | engine repo root (`vendor/carry-ds/`, `vendor.lock.json`, `src/engine`) | 3, a tagged Carry release | Largest cross-repo change; done last among code tasks. **[approval]**: it modifies the engine. |
| 9 | Claims Register sync (optional) | `packages/carry-content/` | 3 | Notion connector available in this session; needs the register's page and an approved-wording field. Deferred. |

Research phase (brief §3–4: landscape, options matrix, architecture proposal, ADRs, dependency and
licensing report) is scheduled **between task 2 and task 3**, because task 3's schema choice and
task 5's export stack are the first consequential dependencies. It is suitable for a lower-cost
model with the matrix in this file as its scope.

## 5. Vertical slice (brief §12), mapped onto the ten tasks

Tokens (existing) → `carry-content` schema (3) → Composition family in React and as a custom
element (4) → `social-graphic` template through the runner (5) → mobile/greyscale check (6) →
`orient` motion on the threshold (4) → release gate (2) → one Ladle story with visual snapshot (8).
The public-package build is the release gate plus a zip step excluding `uploads/`, `strategy/`.

## 6. Budget note

The highest-capability model is best spent on: the schema design (3), the interactive Composition (4), the
engine contract (7) and every decision record. Scaffold files, CI YAML, Ladle wiring, screenshot
plumbing and the research write-up can run on a lower-cost model from this plan.
