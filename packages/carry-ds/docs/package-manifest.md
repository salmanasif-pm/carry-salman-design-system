# Package manifest — internal source vs Carry distributable

## Internal source package (this project, private)
Everything in the project, including:
- `uploads/` — PureLogics and QuickTake design-system references. **Restricted: implementation reference only. Contains third-party brand values, client proposals and screenshots. Never redistribute.**
- `strategy/` — Phase A interpretation, Checkpoint 1 decision doc, and QA captures. Internal decision history.
- `github.md` — sync receipt for the presentation-engine repository.
- All distributable content below.

## Carry distributable package (`carry-ds-<version>.zip`)
**Version:** 0.9.1 · **Build date:** 2026-09-11 · **Release state:** review required (awaiting Salman's identity approval) · **Public build check:** `node scripts/release-check.js --public`

### Included
| path | contents |
|---|---|
| `readme.md`, `SKILL.md`, `CLAUDE.md` | guide, agent skill, standing rules |
| `styles.css`, `tokens/` | entry point + 8 token files |
| `assets/fonts/` | Instrument Sans (OFL 1.1), Geist Mono (OFL 1.1), `fonts-manifest.json` |
| `components/` | 21 components (signature 11 · diagram 6 · data 1 · brand 1 · core 1) with `.d.ts`, `.prompt.md`, 5 cards |
| `guidelines/` | 20 foundation cards |
| `templates/` | 8 templates + `ds-base.js` per template |
| `docs/` | state architecture, rules, governance, accessibility, engine integration, Notion/web, roadmap, delta report, this manifest |
| `scripts/release-check.js` | restricted-content, placeholder, claims and public-build scan |
| `thumbnail.html` | homepage tile |
| `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` | compiled outputs |

### Excluded
`uploads/` · `strategy/` · `github.md` · any PureLogics/QuickTake asset · client or employer proposals · screenshots of restricted material · personal placeholder data · confidential Notion links (sources are named as *internal* in `Provenance`, not linked) · unlicensed assets (none present).

### Licences included
- Instrument Sans — SIL Open Font License 1.1 (© Rodrigo Fuenzalida) — `assets/fonts/`
- Geist Mono — SIL Open Font License 1.1 (© Vercel) — `assets/fonts/`
- React 18.3.1 (MIT), Babel standalone 7.29.0 (MIT) — loaded from CDN by cards only; not redistributed
- `image-slot.js` — starter component supplied by the authoring environment; redistributable with templates
- Carry components, tokens, docs — © Salman Asif; licence to be decided (open decision 5)

### Templates vs verified personal evidence
Every template ships one of three content kinds, declared in its `@template` description and visible in the artifact:
1. **Neutral placeholders** — `[bracketed]` (proposal-document).
2. **Illustrative example — not Salman evidence** — labelled in the artifact (social-graphic, carousel, systems-diagram, component cards).
3. **Verified Salman evidence** — Claims Register wording only, with certainty marks (case-study, executive-deck slide 3, resume-header).
No template presents synthetic information as Confirmed.

### Building the zip
Do not stage a copy inside this project — the compiler treats any `components/**/*.jsx` as a second component tree. Build outside: `zip -r carry-ds-<version>.zip . -x 'uploads/*' 'strategy/*' 'github.md' 'dist/*'` after `node scripts/release-check.js --public` passes.

### Restricted-content scan (run 2026-09-11)
Templates + guidelines: 28 files, 0 failures, 2 allowed employer mentions (PureLogics as employer in case-study and executive-deck). Components, tokens, readme, docs: 0 matches for the banned list (`grep`, see delta report §4). The in-sandbox scan of all 100+ files together timed out; results were obtained in two scoped passes plus grep. **Not run:** `scripts/release-check.js` under Node (no Node runtime in this environment) — run it before the first real distribution.
