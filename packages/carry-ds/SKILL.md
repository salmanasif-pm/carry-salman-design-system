---
name: carry-design
description: Use this skill to generate well-branded interfaces and assets for Carry — Salman Asif's personal design system (Technical Product Manager · Product Strategy, AI & Complex Platforms) — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files (tokens/, components/*/*.prompt.md, templates/, docs/).
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Invariants when generating anything in Carry (docs/rules.md has the full hierarchy):
1. Never invent or overstate evidence. Content is [placeholder], labelled "illustrative example — not Salman evidence", or Claims-Register wording. Unknown stays Unknown.
2. Two registers, one line: first read (Instrument Sans 500) above a 2px rule with one ochre tick; exact second read (Geist Mono) below. Pick the form that fits (Composition: handle-truth · claim-support · outcome-enabled · question-conditions · direction-consequence · intention-reflection · observation-development).
3. Three state axes, never colour: certainty = fill (solid / outline / hatch), gated = bar with gate·owner·clears, release = text tag. Approval ≠ confirmation.
4. Strong defaults: paper / ink / one ochre; weight 500; square; no gradients; few cards; one threshold per view. Exceptions are reasoned and mode-dependent, not decorative.
5. Public copy is plain: say "what's actually going on", not "operating truth". Warmer in personal and social modes.
6. Social graphics: evidence ≥ 36–42px on a 1080 source; test at 360 and 320.
7. Close acted-on artifacts with a lead line and a handoff (state · next · owner · artifact). Run scripts/release-check.js --public before anything leaves.