# 0010 — Dependency: Ladle for component stories

**State:** Open (tooling) · **Owner:** Salman Asif · **Date:** 2026-09-11 · **Affects:** workspace `packages/carry-web` only

**Need.** Task 8 asks for every component with certainty · gated · release as live controls, and the seven forms as stories, so the grammar can be inspected state by state without authoring an artifact.

**Alternatives.** Storybook 8 (rejected for now: ~10× the install, its own build pipeline and addon ecosystem; nothing here needs it). A hand-rolled gallery page in `carry-web` (rejected: controls, width presets and a11y checks would be re-implemented). Histoire (rejected: Vue-first).

**Decision.** `@ladle/react` 5.x (MIT): a Vite-native story runner using the same `vite.config.ts` as `carry-web`, with select/boolean/text controls, width presets (320, 360, 768, 1280 configured) and an axe-based a11y panel. Stories live in `packages/carry-web/src/stories/`; content is `[placeholder]` only.

**Costs.** Dev-time only; no artifact depends on it. Maintenance: story files track component props by their `.d.ts` types, so a prop change fails `typecheck` before it fails a story.

**Reversal cost.** Delete `.ladle/` and `src/stories/`; Storybook's CSF is close enough that stories port with mechanical edits.

**Reopens if.** Interaction testing or a hosted design-review workflow needs Storybook's ecosystem.
