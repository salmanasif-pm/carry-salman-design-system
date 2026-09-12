# Field → component map — Content Brief v1 → Carry v0.9.2 (verified)

Status: verified against the component sources in `packages/carry-ds/components/**` and the props declared in their `.d.ts` files, 2026-09-12 (brief §4.3). Rows the design-side draft got right are unchanged; corrections are marked **(verified: changed)** with the reason. "If missing" follows brief §2.7: nothing is inferred from another field. The last column is honest: no component was invented to fill it.

| field | Carry component / token | prop or slot | if missing | cannot be represented |
|---|---|---|---|---|
| schema_version | — | render report | validation fails (`const "1.0"`) | operating metadata |
| source.origin_type | `Provenance` | `sources[0]` prefix, internal renders only | validation fails | public: omitted by design |
| source.description | `Provenance` | `sources[]` | validation fails | — |
| source.is_derivative | — | validator (`const false`) | validation fails | — |
| reader.role / reader.situation | — | render report; `role` also feeds `ConsequenceNote.who` | validation fails | operating metadata |
| reader_state_a / intended_state_b | — | render report | optional | operating metadata |
| observation | — | render report; internal renders may add an `EvidenceStrip` row labelled `observation` **(verified: changed)** — `Composition.below` is taken by `moves.structure` + `moves.proof` (reconciliation §5), so `observation` has no slot of its own | optional | no dedicated slot |
| tension | — | render report; internal renders may add an `EvidenceStrip` row labelled `tension` **(verified: changed)** — `moves.signal` is required by the schema, so the draft's "`above` when signal empty" never occurs | validation fails | no dedicated slot |
| position_or_open_question.mode | `DecisionLine` | `kind`: position → `decision`, open_question → `question` **(verified: changed)** — `Composition.form` is set by `narrative_form` (reconciliation §6), not by `mode`; `DecisionLine.kind` is the prop that exists (`decision · recommendation · question · refusal`) | validation fails | — |
| position_or_open_question.text | `DecisionLine` | `children` | validation fails | — |
| consequence | `ConsequenceNote` | `children`; `who` = `reader.role` | optional → component omitted | — |
| narrative_form | `Composition` (+ `BoundaryFrame` for checklist_with_boundary) | `form` per reconciliation §6; `Threshold.fn` follows the form | optional → `handle-truth` | `annotated_artifact` (no form; region overlay is a renderer skeleton) |
| channel | renderer | canvas size; and the Carry **mode** on the root (`data-carry-mode`), which is what sets `--provenance-lines` **(verified: changed)** — the token is per mode, not per channel; renderer maps LinkedIn / Carousel → social, Newsletter / Portfolio → executive, Internal → evidence, Video / Podcast / Workshop → executive | validation fails | — |
| artifact_type | renderer | template choice | validation fails | see reconciliation §8 |
| evidence[].claim | `EvidenceStrip` | `items[].value`; `items[].label` is required by the component and is the 1-based index **(verified: changed)** — no label field exists in the brief and the E-grade may not be used publicly | empty list → strip omitted | — |
| evidence[].grade | `Provenance` (internal renders) | appended to the `sources[]` string **(verified: changed)** — `Provenance` has no `grade` prop (`sources · version · date · supersedes · changed · maxLines`) | optional | public (E-labels are banned words) |
| evidence[].link | `Provenance` | `sources[]` (public sources only; internal ones named, not linked) | optional | — |
| evidence[].register_status | — | validator: `banned` fails | optional | no visual |
| certainty | `StateMark` | `{...BRIEF_CERTAINTY[certainty]}` → `certainty` + `variant` + `gated` **(verified: changed)** — the draft said `certainty` + `gated`; the accepted map adds `variant` (inferred · assumed · proposed) | renders `BRIEF_CERTAINTY.undefined` → unknown hatch, plain label "not yet settled" | — |
| action_gate | `StateMark` | `gated={{ gate: <value humanised> }}` for every value except `proceed_now`; `owner` and `clears` are absent, so the component shows no owner line and the render report sets `gate_without_owner: true` | optional → actionable | owner / clears absent in schema v1 (v1.1 proposal) |
| release_permission (+ human_approval_state) | `StateMark` / `HandoffFooter` | `release` per reconciliation §4 | validation fails | — |
| confidentiality.sensitivity | `HandoffFooter` / `StateMark` | `release="restricted"` when client-confidential or PII (overrides) | validation fails | — |
| confidentiality.exclusions | — | confidentiality lint | validation fails | — |
| confidentiality.composite | `Provenance` | `changed="composite example"` (the prop exists; it is the only free text slot in `Provenance`) | validation fails | — |
| audience_action | `DecisionLine` | `kind="question"`, rendered last | optional; fails on follow / subscribe / share / like / tag | — |
| follow_up | — | render report | optional | operating metadata |
| provenance.derived_from | `Provenance` | `sources[]` | optional | — |
| provenance.lineage_stage / grade_ceiling | — | render report | optional | banned words publicly |
| human_approval_state | gate → `InternalWatermark` | `reason` text when the gate fails | validation fails | — |
| moves.signal | `Composition` | `above` (handle register) | validation fails | — |
| moves.structure | `Composition` | `below` row 1, `belowLabel="structure"` | validation fails | dropped second on narrow channels |
| moves.proof | `Composition` / `EvidenceStrip` | `below` row 2 | validation fails | dropped first on narrow channels |
| moves.movement | `Composition` | `lead`, `leadLabel` from the form | validation fails | — |
| motion_opportunity.role | `tokens/motion.css` | `--dur-{role}` and `carry-{role}` keyframes exist for all six roles; `none` → no motion | none | — |
| motion_opportunity.static_equivalent | — | validator; the static render is what exports and reduced-motion show | fails when role ≠ none | — |
| measurement.objective_layer / experiment | — | render report | objective_layer required | operating metadata |
| text.body | `text_post` plain export; `Composition.below` for other artifacts | verbatim | validation fails | — |
| text.slides[] | carousel template | one 1080×1350 section per slide, verbatim | required for carousel / annotated_artifact | — |
| text.regions[] | — | — | required for annotated_artifact | **no component**: `AnnotatedSkeleton` to be built in carry-render |
| text.alt_text | image export | `alt` / `aria-label` on the page frame | optional (warn) | — |
| text.poll_options[] | poll_card template | verbatim rows + mandatory reasoning prompt | required for poll_card | **no component**: plain rows in carry-render |
| *(artifact)* report_back | `ReportBack` **(verified: changed)** | `title · cameIn · changed · unsettled`; third section never hidden | `unsettled` empty → literal "Not yet written" | — |
| *(artifact)* INTERNAL watermark | `InternalWatermark` + `--watermark-*` tokens **(verified: changed)** | `reason`; parent `position: relative`; no hide prop | gate pass → not mounted | — |
