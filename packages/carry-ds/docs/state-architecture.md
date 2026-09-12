# State architecture — v0.9.1

v0.9 made Confirmed / Provisional / Unknown / Gated compete on one axis. They describe three different things. From v0.9.1 every state-bearing element carries up to three independent axes, and shows an axis only when it changes what the reader should do.

## A. Certainty — what do we know?
| key | render | meaning | public |
|---|---|---|---|
| `confirmed` | solid fill | verified against a source the author can name | yes |
| `provisional` | outline | working belief, self-reported or directional; may change | yes |
| `unknown` | 135° hatch | not known — and said so | yes |
| `superseded` | faded solid | was believed; replaced. Kept as history, never deleted | operating only |

Rules: Unknown stays Unknown · a confident layout never upgrades certainty · `superseded` on a public build fails the build.

## B. Actionability — can someone act on it now?
| key | render | meaning |
|---|---|---|
| actionable (default) | nothing extra | act on it at its stated certainty |
| `gated` | horizontal bar across the certainty mark | waits on a named condition |

A gate names: **gate** (the condition), **owner** (who clears it), **clears when** (what has to be true), and optionally **review** (date). A gate without an owner is a delay, not a gate. Valid combinations include Confirmed·gated (true, but not yet publishable/actionable), Provisional·gated, Unknown·gated.

## C. Release — may it be distributed?
| key | tag text | meaning | public build |
|---|---|---|---|
| `internal` | internal | operating material | fails |
| `review` | review required | drafted; awaiting human approval | fails |
| `approved` | approved | a named human approved distribution | passes |
| `restricted` | restricted | confidential by agreement | fails |

Release is a **text tag**, never a colour. Approval never implies the fact is confirmed; confirmation never implies permission to publish. Gated → actionable and review → approved are human acts, never automated.

## Where each axis lives
- **Tokens** (`tokens/shape.css`): `--fill-confirmed/-provisional/-unknown/-superseded`, `--gate-bar`, `--gate-bar-size`. No release tokens — release is type only.
- **Components**: `StateMark {certainty, gated, release}`; `EvidenceStrip`, `Matrix`, `LoadNode`, `ProgressionLadder`, `HandoffFooter`, `Legend` pass the same three props. Legacy `state="gated"` is accepted and normalised to `provisional + gated` (`normalizeState`).
- **Schema** (`docs/engine-integration.md`): `states[]` entries are `{certainty, gated?: {gate, owner, clears, review}, release?}`.
- **Template metadata**: every template's `HandoffFooter` declares certainty + release of the artifact itself.
- **Accessibility language**: alt-text pattern *"n confirmed, n provisional, n unknown; n gated; release: approved"*.
- **Engine validation / public build**: `scripts/release-check.js --public` fails on `superseded`, `internal`, `restricted`, and on an unknown key.

## Badge economy
Default is no mark. Add certainty when it differs from what the reader would assume. Add a gate only where the reader might act. Add release only on artifacts that leave the operating environment.

## v0.9.2 addendum — Content Brief alignment (accepted 2026-09-13)
- Brief certainty maps through `BRIEF_CERTAINTY`: inferred → provisional (outline) · assumed → provisional, dotted outline (`--stroke-assumed`) · proposed → provisional, horizontal hatch (`--fill-proposed`) · gated → unknown + bar · unresolved / missing → unknown. Proposal to the content side: drop `gated` from certainty in schema v1.1 (it is `action_gate`).
- Public wording: `StateMark wording="plain"` and `Matrix wording="plain"` on every public render (working view · not yet settled · waiting on {gate} · "none" for an empty cell). Lint scope is supplied text **and** component labels.
- New: `ReportBack` (three fixed sections; third never hidden) and `InternalWatermark` (ink only, `--watermark-*` tokens). Release-gate failure ⇒ watermark or no render; no override.
