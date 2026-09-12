# Carry — Salman Asif Personal Design System

**Version 0.9.2 — 12 Sep 2026** (v0.9.1 of 11 Sep plus the content-brief alignment in `docs/decisions/0011-content-brief-alignment.md`; applied from `CODEBASE_UPDATES_v0.9.2.md`).** Owner: Salman Asif. Certainty of the system: **Provisional**. Release: **review required** until Salman's identity approval (human-only). Delta from v0.9: `docs/delta-report-v0.9.1.md`.

Carry is the brand operating system for one professional identity — **Technical Product Manager | Product Strategy, AI & Complex Platforms** — whose job is to *make complexity legible enough for the next responsible decision.* North star: **Clarity that carries weight.** Emotional signature: calm command · governed momentum · human consequence. Core movement: Signal → Structure → Proof → Movement.

It is not a company brand, not a social-template pack, and not derived from PureLogics or QuickTake. It is one grammar, five modes, many renderers.

---

## Sources

- **Strategic brief (source of truth):** [Personal Design System Strategic Synthesis & Claude Design Brief v1.2](https://six-kip-645.notion.site/Salman-Asif-Personal-Design-System-Strategic-Synthesis-Claude-Design-Brief-0a2aea1260de4a74b3d67cf7a4d78b16)
- **Inspiration archive (divergent pool, not requirements):** [Personal Design System Inspiration Collection](https://six-kip-645.notion.site/Salman-Asif-Personal-Design-System-Inspiration-Collection-0e6f14e6d4a14284ae7545f6f0651743)
- **Strategic Intelligence OS Pack v1.0** (evidence record; ancestry + permitted-use metadata): [Notion page](https://six-kip-645.notion.site/Strategic-Intelligence-OS-Pack-v1-0-user-provided-derivative-source-set-3ce98b5c31228127b397fc6e453aa9ad)
- **Claims & Verification Register — CV and Positioning** (internal Notion, Career OS): the only source of external claim wording. Not linked here; referenced as *internal*.
- **Technical Product Manager résumé — 9 Sep 2026 reconstruction** (internal Notion): canonical positioning text, contact details and employer history.
- **Master Evidence CV** (internal, 15 pages): evidence source; not used verbatim.
- **Implementation references (mechanics only — never brand):** `uploads/PureLogics Design System - Sep 10/`, `uploads/QuickTake Design System - Sep 10/`, and the presentation engine at [github.com/salmanasif-pm/quicktake-design-system](https://github.com/salmanasif-pm/quicktake-design-system). Explore that repo to see how a content-as-JSON deck engine consumes a vendored design system; Carry is shaped to plug into it as a third vendor (see `docs/engine-integration.md`).
- **Decision trace:** `strategy/phase-a-interpretation.md` (written before the references were opened) and `strategy/Checkpoint 1 — Direction Decision.html` (territories, extraction matrix, scores, nine approved decisions).

No logo file exists in any source and none was drawn: the identity is type-only (`Wordmark`). No photography was supplied; personal-mode templates carry placeholders and rules.

---

## Brand foundation

**Identity hierarchy.** 1 Market identity: Technical Product Manager. 2 Operating character: a disciplined operator who makes complex systems understandable and executable. 3 Human signature: certified personal trainer and serious strength trainee — contributes controlled load, form, progression, recovery; never a second headline.

**The governing idea — two registers, one line.** Every artifact has an accessible first read above the threshold and an exact second read below it. The relationship between them is one of seven **forms** (`Composition`): handle / what's actually going on · claim / support · outcome / how it was enabled · question / conditions · direction / consequence · intention / reflection · observation / development. The tick on the line says which (`docs/rules.md`, `guidelines/brand-compositions.html`). Handle/truth is the sharpest form, not the only one.

**Principles (operationalised, not just stated).**
1. Simplicity is earned — the truth register shows what was considered.
2. Lead with the decision; support it with evidence — `DecisionLine` sits below the threshold, once.
3. Uncertainty is information — three independent axes: certainty (fill), actionability (bar), release (text). `docs/state-architecture.md`.
4. Boundaries enable movement — `BoundaryFrame` gives scope dignity; the outside column is never crossed out.
5. Translate between languages — `Matrix` and load-path diagrams are first-class editorial objects.
6. Warmth enters through consequence — one `ConsequenceNote` per technical artifact.
7. Strength stays under control — weight 500, never bold; strength is in pacing and stance.
8. Signature consistent, atmosphere variable — five modes over one grammar.
9. Design for the absent presenter — `HandoffFooter` closes every shareable artifact.
10. Know when finished — the footer's state says *Ready for review / Awaiting evidence*; a template without a decision line is not finished.

**Rule hierarchy** (`docs/rules.md`): eight **invariants** (no invented evidence, Unknown stays Unknown, no colour-only meaning, release ≠ confirmation, provenance where trust depends on it, accessibility, no operating-only content in public builds, one meaning layer); **strong defaults** (one hue, weight 500, square, no gradients, minimal shadow, few cards, one signature, a closing line); **mode-dependent choices** (portrait photography in introductions, stronger emphasis, a framed module, warmer voice in personal/social).

---

## Content fundamentals

- **Voice:** direct not blunt; confident not absolute; technical not theatrical; empathetic not sentimental; personal not confessional. Calm confrontation: name the visible belief → reveal the operating reality → say why the distinction changes a decision → offer the clearer path.
- **Pattern (operator-led):** observation → what's underneath → why it changes the decision → the sharp line, once, if earned → the question. Illustrative: *"The brief said AI assistant. The users said: I just want to know if it shipped. Three flows, one question. Build the lookup first. What's the question your users actually ask?"*
- **Public vs internal language:** keep *operating truth*, *provenance*, *governed momentum* in docs and schemas; say *what's actually going on*, *where this comes from* in public. Sophistication shows in the observation, not the vocabulary.
- **Person:** "I" for judgment and lived observation; "you/we" for the reader's decision. Never "we" as a corporate voice.
- **Casing:** sentence case everywhere in the handle and body. Uppercase only for 11px mono labels (`the handle`, `src`, `next decision`). Never title case headlines.
- **Numbers:** exact, in the second register, with scope and source when trust depends on it: `3–5 days → about 1 day · self-reported · one function`. Never rounded for effect; never a figure the Claims Register does not carry.
- **State vocabulary (closed):** certainty Confirmed · Provisional · Unknown (+ Superseded, history only) · actionability Gated with gate/owner/clears · release internal · review required · approved · restricted. "Unknown — not yet asked" is a complete sentence.
- **One artifact, one reader, one decision, one ask.** Decision kinds: decision, recommendation, question, refusal. Refusals are visible.
- **Emoji:** never. **Exclamation marks:** unusual. **Hustle idiom:** never. Personal and social modes may be warmer and use contractions freely.
- **The sharp line** is used once per artifact and only when the argument has earned it.

---

## Visual foundations

- **Colour behaviour.** Paper `#EFE9DF` ground, `#F7F4EE` surface, ink `#17181A`. One signal hue, ochre `#B8641C` (`#8C4A12` for text, 5.3:1 on paper). Ochre marks exactly one thing per artifact: the threshold tick and, by extension, the decision. No second accent. No red for risk — constraint is ink and a bar. Graphite ground `#1D1F22` exists for transitions, closers and personal mode only.
- **States are fill, bar and text — not colour:** solid = Confirmed · outline = Provisional · 135° hatch = Unknown · faded = Superseded; a horizontal bar across any mark = Gated; release is a small uppercase tag. Connectors: solid / dashed / dotted. Survives greyscale, print, dark and 360px.
- **Type.** Two registers, one family each. Handle: Instrument Sans, weight 500 only, tight tracking (72/48/32/24). Body: Instrument Sans 17/1.55, measure 64ch. Truth: Geist Mono 13 / 11.5, labels 11px uppercase tracked .08em. Decision Line: 22/1.3 medium. No serif, no bold display.
- **Spacing.** Base 4 (2·4·8·12·16·24·32·48·64·96·128). Density multiplies by mode (`--density`). Threshold position by mode: executive .62 · social .55 · personal .60 · evidence .34 · systems .28 — high line = scan, low line = inspect.
- **Shape.** Square corners (2px on controls only). Strokes 1 / 1.5 / 2. Nothing floats: no shadows except one for floating UI (menus). No pills except the compact wordmark lockup on photography.
- **Backgrounds.** Flat paper. No gradients, no textures, no blueprint grids, no full-bleed washes. Photography (personal mode only) is documentary, desaturated slightly toward paper, never behind text without a solid ink or paper block.
- **Layout.** Controlled asymmetry tied to real hierarchy: one heavy anchor (the handle), dependent elements below the line. Density allowed only below the threshold. Negative space is prioritisation, not decoration. 12-column grid, 24px gutter; slide margin 96px; document margin 64px; social tile padding 32px.
- **Motion.** Six roles — attract, orient, confirm, progress, converge, release — 160–640ms, decelerating ease, no loops, no bounces. Only *attract* moves above the threshold. Everything has a settled static state; exports capture it. `prefers-reduced-motion` zeroes all durations.
- **Hover / press.** Hover darkens ~8% (`filter: brightness(.92)`); press is instant; focus is a 2px ochre outline. Nothing scales or lifts.
- **Cards.** Few. Blocks are separated by rules and space; a framed module (`BoundaryFrame`) is allowed when grouping genuinely helps.
- **Transparency / blur.** None.

---

## Iconography

- **No icon set.** Meaning is carried by the fill grammar (four marks), the threshold tick, the connector arrow and typography. This is deliberate: icons on a truth register invite decoration.
- **Unicode:** `·` as the separator in the truth register, `→` for movement in prose, `—` for a legitimately empty cell. No other glyph-icons, no emoji.
- **If a product surface genuinely needs UI icons** (future web app): use [Lucide](https://lucide.dev) at 1.5px stroke, 16/20px, ink colour only — a documented substitution, not a system element. Flag it when used.
- **Diagrams** are component-drawn (`LoadNode`, `Connector`, `BoundaryFrame`) so they export as SVG/PNG through the engine; never hand-drawn illustration.

## Photography and the fitness layer

- Documentary, not influencer: working, presenting, training as real practice; natural light; no posed lifts, no gym-bro framing, no motivational captions.
- Training imagery appears **only in personal mode**. A professional portrait is a mode-dependent choice for introductions, biographies and portfolio (`executive-deck` slide 1 has an optional slot). The idea leads; Salman appears second.
- Colour: neutral to warm, low saturation; never duotone, never ochre-tinted.
- Text never sits on a photo. Use a paper or ink block.
- **Status:** no images supplied — `templates/personal-post` ships an `<image-slot>` placeholder and these rules.

---

## State grammar (three axes)

| axis | keys | render |
|---|---|---|
| certainty | confirmed · provisional · unknown (· superseded, history only) | solid · outline · hatch · faded |
| actionability | actionable (default) · gated {gate, owner, clears, review} | — · horizontal bar |
| release | internal · review required · approved · restricted | text tag |

Rules: axes appear only when relevant · a Confirmed fact can be gated · approval never confirms; confirmation never permits · gates clear and releases approve by a named human only · public builds fail on superseded / internal / restricted (`scripts/release-check.js --public`). Full spec: `docs/state-architecture.md`.

---

## Components

Namespace on `window`: `DesignSystem_79e114`.

**Signature** (`components/signature/`, 12)
- `Composition` — the seven-form family: above / line / below with form-specific labels, tick and lead.
- `HandleTruth` — the specialised first form.
- `Threshold` — the 2px rule; `fn` = decision · evidence · progression · transition · reflection · separation changes the tick.
- `StateMark` — three-axis marker (certainty · gated · release); visible invalid mark for unknown keys.
- `DecisionLine` — one sentence; kinds decision / recommendation / question / refusal; names its reopen condition.
- `EvidenceStrip` — mono key/value rows with optional states and sources.
- `ConsequenceNote` — "what this changes for {who}" on the warmth surface.
- `CounterpointRail` — the condition that would change the recommendation.
- `HandoffFooter` — state · next decision · owner · next artifact · version.
- `Provenance` — source ancestry; respects provenance lines per mode.
- `ReportBack` — reveal card: what came in · what changed · what could not be settled (third section never hidden; empty renders "Not yet written").
- `InternalWatermark` — overlay for artifacts that failed the release gate; ink only, no hide prop.

**Diagram** (`components/diagram/`, 6)
- `LoadNode` — node with certainty on its edge; `carries` marks the load-bearing anchor.
- `LoadLane` — a band under one owner; `boundary` for a change of hands.
- `Connector` — solid / dashed / dotted arrow with a truth-register label.
- `BoundaryFrame` — own / outside with ochre ports.
- `ProgressionLadder` — staged path with current-step ring.
- `Legend` — states + connector certainty.

**Data** (`components/data/`, 1) — `Matrix` (decision matrix, condition grid, RACI; states in cells).

**Brand** (`components/brand/`, 1) — `Wordmark` (full · name · lockup). No monogram exists.

**Core** (`components/core/`, 1) — `Button` (primary · secondary · ghost · signal).

**Count: 21 JSX components / 26 exports** (signature 12 · diagram 6 · data 1 · brand 1 · core 1; the exports also include `CARRY_FORMS`, `CARRY_CERTAINTY`, `CARRY_OPERATING_CERTAINTY`, `CARRY_RELEASE`, `BRIEF_CERTAINTY`, `normalizeState`). `_ds_bundle.js` and `_ds_manifest.json` are compiled by the design tool and still describe v0.9.1 until the next compile; consumers that transpile the `.jsx` sources see everything.

### Intentional additions
All components are intentional: no source defines a component inventory for this personal system (the brief lists *candidate* signature components; the attached systems' inventories were not carried over). Each maps to a brief §9 hypothesis or a §4 doctrine: Decision Line, Evidence Strip, Boundary Frame, State Marker, Load Path, Consequence Note, Progression Ladder, Counterpoint Rail, Handoff Footer, Source Ancestry → `DecisionLine`, `EvidenceStrip`, `BoundaryFrame`, `StateMark`, `LoadNode/LoadLane/Connector`, `ConsequenceNote`, `ProgressionLadder`, `CounterpointRail`, `HandoffFooter`, `Provenance`. `HandleTruth`/`Threshold` operationalise Visible Handle vs Operating Truth. `Matrix` operationalises bridge languages. `Button` exists for future web/product surfaces only.

---

## Templates (`templates/`)

Each is a `.dc.html` a consuming project copies; all built from the components above.

Content kind is declared in each `@template` description and visible in the artifact.
- `social-graphic` — 1080² claim/support, mobile-readable (evidence 40px ⇒ 13px at 360). *Illustrative.*
- `carousel` — 1080×1350 × 4: observation → found → built → ask. *Illustrative.*
- `executive-deck` — 1920×1080 executive / consulting introduction: who · how · done · next; optional portrait. *Verified wording (slide 3).*
- `proposal-document` — printable direction/consequence recommendation. *Neutral [placeholders].*
- `case-study` — outcome / how it was enabled; evidence strength per work product. *Verified wording; client unnamed.*
- `systems-diagram` — lanes, connector certainty, gates, legend. *Illustrative generic marketplace.*
- `resume-header` — identity block from the current résumé. *Verified.*
- `personal-post` — intention / reflection on graphite; photo slot. *Personal.*

## Repository index

- `styles.css` — entry point; `@import`s everything in `tokens/`.
- `tokens/` — `fonts.css` (self-hosted OFL Instrument Sans + Geist Mono), `palette.css` (raw), `semantic.css` (roles, grounds, modes), `typography.css`, `space.css`, `shape.css` (fill grammar), `motion.css`, `base.css`.
- `assets/fonts/` — woff2 binaries + `fonts-manifest.json` (licence + source URLs).
- `components/` — signature / diagram / data / brand / core (each `.jsx` + `.d.ts` + `.prompt.md` + one `*.card.html`).
- `guidelines/` — 20 foundation specimen cards (Colors 4, States 3, Type 3, Spacing 3, Brand 4, Motion 1, Voice 2).
- `templates/` — eight starting templates (above).
- `docs/` — `delta-report-v0.9.1.md`, `state-architecture.md`, `rules.md`, `package-manifest.md`, `engine-integration.md`, `governance.md`, `accessibility.md`, `notion-web.md`, `roadmap.md`, `evidence/` (mobile screenshots).
- `scripts/release-check.cjs` — restricted-content / placeholder / claims / public-build scan (`release-check.js` is a thin entry that loads it; `docs/decisions/0007`).
- `strategy/` — Phase A interpretation and the Checkpoint 1 decision document (internal package only).
- `SKILL.md`, `CLAUDE.md` — agent guidance for generating new artifacts consistently.
- `thumbnail.html` — homepage tile.

## Accessibility (summary; full checklist in `docs/accessibility.md`)
Ink on paper 14.6:1; ochre text 5.3:1; ink-3 on paper 5.0:1. State never by colour alone. Focus visible. Hit targets ≥44px. Reduced motion honoured. Print inverts graphite to white (`tokens/base.css`). Social evidence ≥ 36–42px source. Every diagram ships with a `Legend` and alt text: *"[what] — n confirmed, n provisional, n unknown; n gated; load carried by [node]."*
