# Engine integration — Carry as a third vendor

Target: [salmanasif-pm/quicktake-design-system](https://github.com/salmanasif-pm/quicktake-design-system) (the content-as-JSON → single-file HTML/PDF/PNG renderer). Carry is shaped so the engine can vendor it with no engine-side brand code. **Reuse right assumed:** the repo is under Salman's account; PureLogics/QuickTake vendor trees remain untouched and are not referenced by Carry.

## 1. Vendoring
```
vendor/carry-ds/            ← byte-identical copy of this project (minus uploads/, strategy/)
  styles.css  tokens/  components/  assets/fonts/  _ds_bundle.js  _ds_manifest.json  readme.md
```
- Add every file to `vendor.lock.json` (sha-256) — same rule as the other two vendors: read-only, integrity-checked on every build.
- Namespace: `window.DesignSystem_79e114` (from `_ds_manifest.json`). Fonts are OFL; **no `--public` stripping is required** for Carry — but the flag must still succeed (no-op) so the build contract is uniform.

## 2. Content contract extension
`meta.system: "carry"`. `meta.dialect` → Carry **mode**: `executive | social | systems | evidence | personal` (applied as `data-carry-mode` on the artifact root). `meta.mode: "graphite"` allowed only for `personal` and for individual slides flagged `ground: "graphite"` (transitions/closers).

### Three-axis states replace badges
Carry does not use the nine QuickTake labels. `badges[]` is rejected for `system: carry`; use `states` with three independent axes (see `docs/state-architecture.md`):
```json
"states": [{ "certainty": "confirmed", "gated": { "gate": "legal review", "owner": "named owner", "clears": "signed NDA", "review": "2026-09-24" }, "release": "review", "label": "wording held" }]
```
`certainty`: `confirmed | provisional | unknown` (public) · `superseded` (operating history only). `gated`: absent, `true`, or an object — an object without `owner` is a validation **warning**. `release`: `internal | review | approved | restricted`. With `public_build: true` the build **fails** on `superseded`, `internal`, `restricted`, on any unknown key, and on any artifact lacking `release: approved`. Never a silent fallback.

### Required fields per artifact (fail-closed)
Every Carry artifact declares a `form` (`handle-truth | claim-support | outcome-enabled | question-conditions | direction-consequence | intention-reflection | observation-development`) and a `lead` object — `{ kind: decision|recommendation|question|refusal|next|kept|open, text, reopens? }`. All forms except `observation-development` **fail the build** without a lead. Every artifact also declares `content_kind: placeholder | illustrative | verified`; `illustrative` renders the label *illustrative example — not Salman evidence*; `verified` requires a `claims_register_ref`. `consequence: { who, text }` is required when `dialect` is `systems` or `evidence`. `handoff: { state, next, owner, artifact }` is required for `executive` and `evidence`.

### Provenance
`sources[]` render through `Provenance`; the renderer passes `maxLines` from `--provenance-lines` for the mode (social 1 · executive 2 · systems/evidence all · personal 1). Version stamp continues to render in the footer per engine rule 7.

## 3. Slide / artifact types → components
| type | Carry components |
|---|---|
| `title` | Wordmark, Threshold, Provenance |
| `statement` | Composition (form from content; vertical on 16:9) |
| `decision` (new) | DecisionLine + EvidenceStrip + CounterpointRail |
| `evidence` (new) | EvidenceStrip + Provenance |
| `table` / `compare` | Matrix |
| `diagram` | LoadLane, LoadNode, Connector, BoundaryFrame, Legend |
| `timeline` | ProgressionLadder |
| `consequence` (new) | ConsequenceNote |
| `close` | HandoffFooter + Wordmark(lockup) |
| `stats`, `quote`, `cards` | **not supported** for Carry → labelled fallback panel (equal-weight cards and count-ups are anti-patterns) |

New artifact families beyond decks: `social` (1080²), `carousel` (1080×1350 ×N), `document` (flowing page, print), `diagram` (standalone SVG/PNG via `export:diagram`). Each maps 1:1 to a folder in `templates/`.

## 4. Motion presets → roles
`fade-rise` → attract · `draw-line` → orient (threshold draws left→right, tick lands) · `stagger-cards` → progress (ladder only) · `sweep-in` → converge · `count-up` and `flow-pulse` → **disabled** for Carry (activity-density and looping are anti-patterns). Exports capture the settled state; reduced-motion zeroes all durations via `tokens/motion.css`.

## 5. Exports
Unchanged: `index.html` (self-contained), `deck.pdf`, `png/`, `diagrams/*.svg|png`. Add `social/*.png` at 1080 and 2160.

## 6. What the engine must never do (inherits CLAUDE.md law)
Invent a state, soften a label, collapse the three axes into one, upgrade certainty on release approval, add a second accent, render a claim without its state when the content carries one, drop the lead line (except observation-development), present placeholder or illustrative content as verified, or blend a Carry mode with a PureLogics/QuickTake dialect.