# Carry — standing guidance for AI collaborators (rename this file to CLAUDE.md at the repo root)

`packages/carry-ds/` is the canonical design system. Salman Asif owns identity decisions; you propose.

- Read `packages/carry-ds/SKILL.md`, `readme.md`, `docs/rules.md`, `docs/state-architecture.md`, `docs/engine-integration.md`, `docs/handoff-claude-code.md` before writing code.
- Invariants (docs/rules.md) are strict; strong defaults (one hue, weight 500, square, no gradients, few cards, one signature) need a reasoned, recorded exception in `docs/decisions/`; mode-dependent choices are allowed when they serve the reader. No serif, no monogram, no emoji.
- States are three axes: certainty confirmed · provisional · unknown (· superseded, history only); gated {gate, owner, clears, review}; release internal · review · approved · restricted. Never collapse them, add, rename or soften one, or render an unknown key silently. Approval never confirms.
- Content is one of: [placeholder], "illustrative example — not Salman evidence", or Claims-Register wording. Never invent an achievement, figure, source, contact detail or client. `node packages/carry-ds/scripts/release-check.js --public` gates every PR.
- Every acted-on template has a lead line below a threshold (observation-development may omit it). Every shareable template ends with a handoff footer.
- Social graphics: essential evidence ≥ 36–42px on a 1080 source; test at 360 and 320 px and in greyscale.
- Fitness content: personal mode only, documentary only, never a professional headline. Portrait photography allowed in introductions.
- Never commit `uploads/`, `strategy/` or any PureLogics / QuickTake material.
- Do not change token values or component semantics without a `docs/decisions/NNNN-*.md` entry naming what would reopen it. Enhance the tooling, not the identity.
- Workspace map, commands and the artifact contract for agents: `AGENTS.md`.
