# Vocabulary reconciliation — Content Brief v1 ↔ Carry v0.9.1

Written design-side 2026-09-13 so the Claude Code thread implements against settled mappings instead of guessing. Per brief §8(3): recommendations, no unilateral schema change. All **DECISION** items were accepted by Salman on 2026-09-13; implementation landed in Carry v0.9.2 (see `docs/content-os/CODEBASE_UPDATES_v0.9.2.md`).

## 1. Certainty

Brief: one field, six values — `confirmed · inferred · assumed · proposed · gated · unresolved`. Carry: certainty `confirmed · provisional · unknown` (+ `superseded` history) with **gated as a separate axis** (the brief already has that axis too: `action_gate`).

Rendering map (no schema change; every value visibly distinct, survives greyscale):

| brief `certainty` | Carry certainty | mark | plain label (public) |
|---|---|---|---|
| confirmed | confirmed | solid | confirmed |
| inferred | provisional | outline | inferred |
| assumed | provisional | outline, dotted stroke | assumed |
| proposed | provisional | horizontal hatch (`--fill-proposed`, reinstated) | proposed |
| gated | unknown **+ gated bar** | hatch + bar | waiting on … |
| unresolved | unknown | 135° hatch | not yet settled |
| *(missing)* | unknown | 135° hatch | not yet settled |

Recommendation: in schema v1.1 drop `gated` from `certainty` — it is already `action_gate: formal_approval_required | proceed_with_dependency`, and a Confirmed fact can be gated. Until then the renderer treats `certainty: gated` as above and writes a warning to the render report. **DECISION**: accept the map; accept v1.1 proposal.

Note: Carry's "default is no mark" does not apply to briefs — brief §2.4 says missing renders as unresolved. Renderer follows the brief.

## 2. Actionability / gates

Brief `action_gate` is a single enum with no owner or clearing condition. Carry's gate requires **gate · owner · clears** ("a gate without an owner is a delay"). Map: `proceed_now` → actionable; everything else → gated with `gate = action_gate value` humanised, `owner` and `clears` **absent**. The render report must flag "gate has no owner". **DECISION**: propose v1.1 `action_gate: {kind, owner, clears, review}`.

## 3. Banned vocabulary vs Carry's own chrome

Three Carry-rendered strings trip brief §5 on a public render:
- `StateMark`, `Legend`, `HandoffFooter`, `LoadNode` print **"gated"** / "gated on X".
- `Matrix` renders **"—"** (U+2014) for a legitimately empty cell.
- `Provenance` label "supersedes" is fine; "lineage" is not used. OK.

Done now: `StateMark` gains `wording="plain"` (public labels: confirmed / inferred·assumed·proposed as given / working view / not yet settled / waiting on {gate}). Default `wording="system"` unchanged. **DECISION**: (a) public renders always use `wording="plain"` — recommended; (b) Matrix empty cell → the word "none" on public renders, keep "—" internally — recommended; (c) lint scope = supplied text fields **and** component labels — recommended, since the reader cannot tell them apart.

## 4. Release / approval

Brief: `release_permission: internal_only | draft_shareable | approved_public` **and** `human_approval_state`. Carry: `internal | review | approved | restricted`. Map:

| brief | Carry release tag |
|---|---|
| internal_only | internal |
| draft_shareable | review |
| approved_public + approved_by_salman | approved |
| approved_public + anything else | review (and gate fails → INTERNAL watermark) |
| confidentiality.sensitivity ∈ {client-confidential, PII} | restricted (overrides) |

Both systems agree approval never confirms a fact. No change proposed.

## 5. Four moves → composition slots

`moves.signal` → **above** (handle register, largest) · `moves.structure` + `moves.proof` → **below** (truth register; structure first, proof second, each labelled) · `moves.movement` → **lead** (last thing read). This is exactly Carry's Composition; nothing new. Channel drop order (brief §2.6): proof, then structure — Composition renders with `below` empty and `hasTruth=false` (no tick) so a dropped register is visible, not faked.

## 6. narrative_form → Composition.form

| narrative_form | form | threshold fn |
|---|---|---|
| observation_reframe | handle-truth | decision |
| contrarian | handle-truth | decision |
| case_led | outcome-enabled | evidence |
| before_after_state | outcome-enabled | progression |
| teardown | claim-support | evidence |
| checklist_with_boundary | claim-support + BoundaryFrame | separation |
| question_led | question-conditions | decision |
| decision_walkthrough | direction-consequence | decision |
| open_log | observation-development | reflection |
| annotated_artifact | **none** — needs region overlay (not built) | — |

## 7. Motion

Brief roles = Carry roles exactly (`attract orient confirm progress converge release`). Carry already has a static equivalent per role in `tokens/motion.css`; brief additionally requires `static_equivalent` text non-empty — validator's job. No conflict.

## 8. Fields Carry cannot represent today (honest list)

| field / artifact | why | proposal |
|---|---|---|
| `text.regions[]` / annotated_artifact | no overlay component; skeleton-drawing is a renderer concern | Claude Code builds `AnnotatedSkeleton` in carry-render, not in carry-ds |
| `poll_card` | no component; option list + reasoning prompt | build as a template in carry-render using `Matrix`-free plain rows; LinkedIn limits to be looked up |
| `report_back` (three fixed sections) | `Composition` has two registers + lead, not three named sections | **DECISION**: add `ReportBack` to carry-ds (design here) or keep it renderer-only |
| INTERNAL watermark | no token or treatment | **DECISION**: design here — proposed: 11px mono uppercase "INTERNAL · not for distribution" repeated diagonal at 12% ink, plus a solid ink top bar; never ochre |
| `evidence[].grade` E1–E4 | no grade axis; and E-labels are banned publicly | internal renders: grade in Provenance row; public: certainty only |
| `reader_state_a / intended_state_b`, `measurement`, `follow_up`, `provenance.lineage_stage`, `grade_ceiling` | operating metadata, not artifact content | render report only |
| `evidence[].register_status` | no visual; and "banned" wording must block render | validator, not renderer |

## 9. Text immutability

Carry sets `text-wrap: pretty` (line wrapping only, never sentence change) and uses `·` separators in chrome — no dash substitution occurs anywhere in components. `text_post` plain export must bypass HTML entirely. Confirmed no conflict.
