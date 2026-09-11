# Reference-extraction matrix — QuickTake / PureLogics engine repository

Status: provisional · release: internal · owner: Salman Asif · date: 2026-09-11

The brief's reference firewall requires an explicit decision per mechanism before either reference
repository is used. This matrix covers `salmanasif-pm/quicktake-design-system` (the presentation
engine, the only reference repository available in this session). `vendor/quicktake-ds/` and
`vendor/purelogics-ds/` inside it were **not opened**; only their manifest shape as seen through
`vendor.lock.json` and the engine's own scripts was inspected.

Decisions: **Learn** (understand, write our own) · **Reimplement** (same mechanism, new code, Carry
semantics) · **Adapt with attribution** (copy a generic snippet, cite the file) · **Reject**.

| # | Mechanism in the reference repo | Where | Decision | Note |
|---|---|---|---|---|
| 1 | Content-as-JSON deck contract (`meta` + `slides[]`, unknown type → labelled fallback) | `README.md`, `src/engine/validate.mjs` | Learn | Carry's contract is three-axis states + `form` + `lead` + `content_kind`; badges are rejected for Carry (engine-integration §2). |
| 2 | Fail-closed validation on unknown badge keys | `src/engine/validate.mjs`, `test/validate.test.mjs` | Reimplement | Same posture, applied to `certainty`, `release`, gate objects, missing `lead`, `verified` without `claims_register_ref`. |
| 3 | Vendor integrity lock (sha-256 per file, read-only vendor trees) | `vendor.lock.json`, `scripts/vendor.mjs`, `scripts/check-vendor.mjs` | Learn now; Reimplement in task 7 | Task 7 adds `vendor/carry-ds/` to the engine using the engine's own tooling. Carry's own repo does not need a vendor lock. |
| 4 | Single-file self-contained HTML output (CSS/JS/fonts inlined) | `src/engine/html.mjs`, `css.mjs`, `fonts.mjs`, `assets.mjs` | Learn | Carry renderers (task 5) target the same "opens from disk" guarantee. Implementation written fresh against Carry tokens. |
| 5 | Playwright export to PDF/PNG with a preprovisioned browser | `scripts/export.mjs`, `scripts/lib/browser.mjs`, CI comment about `playwright install` | Reimplement | Same browser-resolution trick (env-provisioned vs CI-installed). Carry adds 1× / 2× social PNG, greyscale and 360/320 mobile captures. |
| 6 | Standalone diagram export (SVG + PNG per diagram slide) | `scripts/export-diagram.mjs` | Learn | Carry diagrams are component-drawn (`LoadNode`, `Connector`, `BoundaryFrame`); export path designed after the template runner exists. |
| 7 | Acceptance verification over `dist/` | `scripts/verify.mjs` | Learn | Carry's equivalent is the mobile-readability check (task 6) plus release-check on rendered output. |
| 8 | Dependency policy check (no UI libraries) | `scripts/check-deps.mjs` | Reimplement | Carry keeps the same rule: no external UI/CSS libraries; tooling dependencies only. |
| 9 | CI shape (checkout → node → install → gates → build → export smoke → upload dist on failure) | `.github/workflows/ci.yml` | Learn | Carry's CI (task 2) starts with the release gate and the "did the gate actually run" assertion; export smoke arrives with task 5. |
| 10 | Proposals folder with `PROPOSAL.md` for missing components | `src/proposals/` | Learn | Carry already has `docs/decisions/` + `docs/exceptions/` in its governance; no proposals folder needed. |
| 11 | Version stamping (engine + DS versions in footer and meta tag) | `src/engine/version.mjs` | Learn | Carry's `HandoffFooter` already carries version; renderers stamp engine and package versions the same way. |
| 12 | Motion presets and reduced-motion gating | `src/motion/motion.css`, `src/runtime/deck.js` | Reject as source; Learn as mechanism | Carry motion is six named roles in `tokens/motion.css` with its own durations and eases. Preset mapping lives in engine-integration §4 only. |
| 13 | Font licence switch (`--public` strips licensed faces) | `src/engine/fonts.mjs`, `scripts/build.mjs` | Learn | Carry fonts are OFL; `--public` must still succeed as a no-op for a uniform build contract. |
| 14 | Any token value, colour, type choice, dialect, slide chrome, badge label, example content | `vendor/*`, `content/*.deck.json`, `src/engine/chrome.jsx`, `pl-shell.jsx` | **Reject** | Firewall. Never read into Carry. Carry's `release-check.js` already treats the names as restricted outside allow-listed docs. |
| 15 | Kiosk / clinical / sponsor terminology and client material | `content/`, `docs/vendor-report.md` | **Reject** | Banned list in `scripts/release-check.js`. |

Runtime boundary check: `carry/` has no import, stylesheet, token or asset reference into `vendor/`,
`src/` or `content/` of the engine repo, and none is planned. Task 7 goes the other way: the engine
vendors Carry.
