# 0004 — Three independent state axes

**State:** Open (grammar layer) · **Owner:** Salman Asif · **Date:** 2026-09-11 (v0.9.1) · **Supersedes:** the v0.9 single state axis · **Affects:** `StateMark`, `EvidenceStrip`, `Matrix`, `LoadNode`, `ProgressionLadder`, `HandoffFooter`, `Legend`; `tokens/shape.css`; `docs/state-architecture.md`; the content schema

**Decision.** Certainty (`confirmed` solid · `provisional` outline · `unknown` 135° hatch · `superseded` faded, operating history only) is rendered as fill. Actionability (`gated` with gate · owner · clears · optional review) is a horizontal bar across the mark. Release (`internal` · `review` · `approved` · `restricted`) is a text tag, never colour. Axes appear only when they change what the reader should do. Approval never confirms; confirmation never permits. Gated → actionable and review → approved are acts of a named human, never automated. A gate without an owner is a delay, not a gate (validation warning). Unknown keys render a visible invalid mark in the design system and fail the build in an engine.

**Options considered.** One axis with `gated` and `proposed` as peers of `confirmed` (v0.9; superseded because a fact can be both confirmed and gated, and `proposed` was a release state wearing a certainty costume). Colour per state (rejected: invariant 3). Dropping `superseded` (rejected: history must be kept, never deleted; it is simply operating-only).

**Trade-off.** Three axes are more to author. The badge economy in `docs/state-architecture.md` limits it: default is no mark.

**Evidence and ancestry.** Brief v1.2 principle 3 ("uncertainty is information"); `docs/delta-report-v0.9.1.md` §2; `guidelines/states-*.html`.

**Risks.** Legacy `state="gated"` content is normalised to `provisional + gated` by `normalizeState`; renderers must keep accepting it until every template is migrated. Public builds must fail closed on `superseded`, `internal`, `restricted` and on any artifact lacking `release: approved`.

**Reopens if.** A fourth dimension proves necessary in practice (for example confidentiality distinct from release), or a real artifact cannot be described in these three.
