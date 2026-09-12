# Handoff brief for the Claude Code thread that owns the Carry design-system codebase

Purpose: make Carry able to consume a machine-readable Content Brief and render channel-appropriate content artifacts, without rebuilding Carry and without letting the renderer change the idea, the wording or the approval state. Written 2026-09-12 from the Content Creation OS v1 sprint. Owner: Salman Asif.

How to use this file: save it in the Carry repo (suggested path `docs/content-os/CONTENT_BRIEF_HANDOFF.md`) and open the Claude Code thread with: "Read docs/content-os/CONTENT_BRIEF_HANDOFF.md. Follow section 2 (non-negotiables) and deliver section 4 in order. Stop and report after 4.1 to 4.3 before writing any renderer." The thread already knows the codebase; this file tells it what the content side needs and what it must not do.

---

## 1. Context in five lines

Salman runs a Content Creation OS inside his Notion Career + Consulting OS. Each piece of content is a Career OS item with properties (Publish Status, Risk Label, Sensitivity, Permitted Use, Evidence grade, Voice Pass) and, from now on, a Content Brief: a structured record of source, reader, tension, position, evidence, confidentiality, audience action, approval state and measurement objective. Carry is the intended rendering layer: it takes an approved brief plus the human-final text and produces the artifact for a channel (LinkedIn text post, carousel, annotated artifact, poll card, report-back, newsletter section). Carry does not write, rewrite, tighten or "improve" text. Carry does not decide what to publish. The design brief that Carry already follows (four moves: signal, structure, proof, movement; certainty vocabulary; semantic motion roles with a static equivalent) is the vocabulary the Content Brief uses, so the two should fit without new concepts.

## 2. Non-negotiables (implement as code, not as comments)

1. Release gate. Public render is refused unless BOTH `release_permission == "approved_public"` AND `human_approval_state == "approved_by_salman"`. Any other combination renders with a visible INTERNAL watermark or does not render at all (configurable, default watermark). There is no override flag.
2. Text is immutable. The renderer never edits, reflows into different sentences, capitalises, adds punctuation, or converts `--` or ` - ` into em-dashes. Typographic smart-quote substitution is allowed; dash substitution is not. If text does not fit a component, the renderer fails loudly with the overflow measured; it never truncates silently.
3. Confidentiality lint. Before render, scan every text field that will be visible (body, slide text, alt text, caption, hashtags, poll options) against `confidentiality.exclusions` (case-insensitive substring match) and against a banned-vocabulary list (section 5). Any hit blocks the render and lists the hits. This runs even for internal renders.
4. Certainty is visual weight. The `certainty` value (confirmed / inferred / assumed / proposed / gated / unresolved) must produce visibly different treatment, and "confirmed" must never be the default when the field is missing. Missing certainty renders as "unresolved".
5. Motion needs a static twin. `motion_opportunity.role` (attract / orient / confirm / progress / converge / release) may drive animation only if `motion_opportunity.static_equivalent` is non-empty, and the static version is what renders under `prefers-reduced-motion` and in any image export. No static equivalent, no motion.
6. Layout follows the four moves. Space is allocated by `moves.signal`, `moves.structure`, `moves.proof`, `moves.movement`, not by paragraph order. Signal gets the most visual weight; movement is the last thing the reader sees. Where a channel cannot show all four (a single tweet), the renderer drops proof and structure first and says so in the render report.
7. No inference. The renderer never fills a missing field from another field (for example, it never derives `audience_action` from the closing question, never derives `certainty` from confident wording, never sets `release_permission` from `Publish Status`). Missing required fields fail validation.
8. Nothing is published. No LinkedIn, X or other network integration in this scope. Output is files (PNG, SVG, PDF, HTML, plain text) in a local `out/` folder plus a render report.

## 3. What the content side supplies

One JSON file per piece, validated against the schema in section 6 (YAML below shows it; the deliverable is a JSON Schema). Plus the human-final text as a separate field or file (`text.body`, and for carousels `text.slides[]`), so the brief and the text are never confused. The Notion side stores the brief as a code block in the item body for now (no JSON property was approved), so expect copy-paste JSON, and validate strictly.

## 4. Deliverables from the Carry thread, in this order

Stop and report after 4.3. Do not start 4.4 until Salman has read the mapping.

4.1 `content-brief.schema.json` (JSON Schema 2020-12) generated from section 6, with every enum closed, required fields marked, and `additionalProperties: false`. Include `schema_version` pinned to "1.0".

4.2 `validate-brief` CLI or script: validates a JSON file, runs the confidentiality lint (section 2.3) against the supplied text, prints PASS or a numbered list of failures. Exit code non-zero on any failure.

4.3 Mapping report, as a markdown table committed at `docs/content-os/FIELD_TO_COMPONENT_MAP.md`, one row per brief field: field, the existing Carry component or token that carries it, the prop or slot used, what happens if the field is missing, and a column "cannot be represented" with a reason where true. This report is the thing the content side needs most; it closes an open question in the Content OS. Be honest in the last column. Do not invent components to make the table look complete.

4.4 Renderers for four artifact types only, matching the four-format application test already written on the content side:
   a. `text_post` (LinkedIn long or short post): plain-text export with line breaks preserved exactly, plus an optional cover image that carries only `moves.signal` and the certainty treatment.
   b. `poll_card`: options list plus the mandatory-reasoning prompt; the render report must include the character count per option against LinkedIn's poll limits, which the thread should look up rather than assume.
   c. `carousel` and `annotated_artifact`: slide sequence from `text.slides[]`; for annotated artifacts, numbered regions from a `regions[]` array (id, label, bbox or anchor) drawn over a from-scratch skeleton, never over an imported document image.
   d. `report_back`: a reveal card with three fixed sections in this order: what came in, what changed, what could not be settled. The third section is mandatory and may not be hidden when empty; it renders the literal text "Not yet written" instead.

4.5 One fixture: the worked example in section 7 (composite, internal only, approval state needs_human_review) rendered as `text_post`. It must come out watermarked INTERNAL because the gate in 2.1 fails. That is the correct result; a fixture that renders publicly is a bug.

4.6 Render report (`out/<id>/render-report.json`): gate result, lint result, which moves were dropped for the channel, motion used or static fallback, overflow measurements, and the schema version.

## 5. Banned vocabulary in rendered public text (lint list)

OS-internal words that must not appear in anything rendered for `approved_public`: residue, source residue, tension gate, State A, State B, lineage, evidence grade, E1, E2, E3, E4, franchise, territory, gate, gated, Unknown stays Unknown, Risk Label, PS, NHR, DNU, Permitted Use, Voice Pass, objective layer, Content Brief. Also block any em-dash character (U+2014) and en-dash used as a clause separator (U+2013 surrounded by spaces). The list lives in one file so the content side can extend it.

## 6. Content Brief v1 schema (source of truth for 4.1)

```yaml
schema_version: "1.0"

source:
  origin_type: ""              # enum: meeting | transcript | document | repo | external_publication | personal_log | observation
  description: ""              # string, confidentiality-safe, never names a real party
  is_derivative: false         # bool; must be false (true is a lineage violation and fails validation)

reader:
  role: ""                     # string
  situation: ""                # string

reader_state_a: ""             # string
intended_state_b: ""           # string

observation: ""                # string, 2 to 6 lines
tension: ""                    # string, "X is true and Y is also true, and that is uncomfortable"

position_or_open_question:
  mode: ""                     # enum: position | open_question
  text: ""

consequence: ""                # string

narrative_form: ""             # enum: observation_reframe | case_led | contrarian | question_led | teardown
                               #   | checklist_with_boundary | decision_walkthrough | before_after_state
                               #   | annotated_artifact | open_log
                               # (vocabulary owned by the content side; treat as closed enum)
channel: ""                    # enum: LinkedIn | Video | Newsletter | Podcast | Carousel | Workshop | Portfolio | Internal
artifact_type: ""              # enum: text_post | short_post | thread | carousel | long_form | diagram
                               #   | video_script | talk_outline | worksheet | template | poll_card
                               #   | annotated_artifact | report_back

evidence:                      # list, may be empty
  - claim: ""
    grade: ""                  # enum: E1 | E2 | E3 | E4
    link: ""                   # string, may be ""
    register_status: ""        # enum: approved_wording | not_in_register | banned | needs_evidence

certainty: ""                  # enum: confirmed | inferred | assumed | proposed | gated | unresolved

action_gate: ""                # enum: proceed_now | proceed_with_dependency | sandbox | research_further
                               #   | roadmap_future | reject | formal_approval_required
release_permission: ""         # enum: internal_only | draft_shareable | approved_public

confidentiality:
  sensitivity: ""              # enum: public | internal | employer-internal | client-confidential | PII
  exclusions: []               # list of strings; lint targets
  composite: true              # bool

audience_action: ""            # string; validation fails if it contains follow, subscribe, share, like, tag
follow_up:
  planned: false
  description: ""

provenance:
  derived_from: []             # list of URLs; empty for an original piece
  lineage_stage: ""            # enum: source | evidence | interpretation | draft | human_revision | published
                               #   | channel_adaptation | response | derivative_asset
  grade_ceiling: ""            # enum: E1 | E2 | E3 | E4

human_approval_state: ""       # enum: not_started | ai_draft | human_first_draft | human_rewrite_done
                               #   | voice_rubric_passed | failed_rubric | needs_human_review | approved_by_salman

moves:
  signal: ""
  structure: ""
  proof: ""
  movement: ""

motion_opportunity:
  role: ""                     # enum: attract | orient | confirm | progress | converge | release | none
  static_equivalent: ""        # required non-empty when role != none

measurement:
  objective_layer: ""          # enum: distribution | attention | participation | perception | routing | learning
  experiment: ""               # URL or ""

text:                          # supplied separately from the brief but validated with it
  body: ""                     # human-final text; immutable
  slides: []                   # list of strings for carousel / annotated_artifact
  regions: []                  # list of {id, label, anchor} for annotated_artifact
  alt_text: ""
  poll_options: []             # list of strings for poll_card
```

Required for any render: schema_version, source, reader, tension, position_or_open_question, channel, artifact_type, certainty, release_permission, confidentiality, human_approval_state, moves, measurement.objective_layer, text.body. Everything else optional but validated when present.

## 7. Worked example fixture (composite; must render INTERNAL)

```json
{
  "schema_version": "1.0",
  "source": {"origin_type": "transcript", "description": "Internal assessment grounded in a recorded discovery review, plus the BA Team Operating System framework and the Discovery Call Playbook.", "is_derivative": false},
  "reader": {"role": "Product managers, business analysts, account executives, consultants and technical leaders who sit in customer discovery calls.", "situation": "Running discovery against a prepared question bank, under time pressure to produce a scope and an estimate."},
  "reader_state_a": "Judges discovery by coverage. A completed questionnaire and full notes feel like a job done well.",
  "intended_state_b": "Judges discovery by progression. Asks whether the next question earned the answer that came before it.",
  "observation": "In a discovery review, a customer disclosed that demand existed which the business could not fulfil. The conversation moved to the report. The disclosure was not followed up. Composite, principle level only.",
  "tension": "The questionnaire was completed fully and the most consequential signal in the conversation was still missed, and that is uncomfortable because completeness is the thing most teams measure.",
  "position_or_open_question": {"mode": "position", "text": "Discovery quality shows up in the question asked after the answer, not in the coverage of the question bank."},
  "consequence": "A business constraint gets converted into reporting functionality. The team scopes and estimates the wrong intervention, and the mistake surfaces after commitment.",
  "narrative_form": "observation_reframe",
  "channel": "LinkedIn",
  "artifact_type": "text_post",
  "evidence": [
    {"claim": "Multiple consequential disclosures were followed by unrelated, repeated, or primarily functional questions.", "grade": "E3", "link": "", "register_status": "needs_evidence"},
    {"claim": "The report mattered but was not yet the problem.", "grade": "E3", "link": "", "register_status": "approved_wording"}
  ],
  "certainty": "inferred",
  "action_gate": "formal_approval_required",
  "release_permission": "internal_only",
  "confidentiality": {"sensitivity": "internal", "exclusions": ["employer, client, prospect or partner name", "individual names or identifying roles", "location", "referral count or any figure from the source", "timestamps", "transcript identifiers or quoted transcript lines"], "composite": true},
  "audience_action": "Name the answer that would make you abandon your discovery script for five minutes, and say what you asked instead.",
  "follow_up": {"planned": true, "description": "If replies produce real examples, publish a composite pattern note on which disclosures most often get converted into features. Requires its own gate."},
  "provenance": {"derived_from": [], "lineage_stage": "draft", "grade_ceiling": "E3"},
  "human_approval_state": "needs_human_review",
  "moves": {
    "signal": "The customer showed us demand the business could not fulfil. We discussed the report.",
    "structure": "fact, then consequence, then cause, then option, then decision. The conversation stopped at fact.",
    "proof": "A completed question bank and a full set of notes are both compatible with a missed signal. Coverage and progression are different measures.",
    "movement": "Judge discovery by whether the next question earned the answer before it."
  },
  "motion_opportunity": {"role": "orient", "static_equivalent": "A two-branch diagram: one branch returns to the checklist and ends in a report; the other follows the signal through consequence, cause, option, decision. Fully legible with no animation."},
  "measurement": {"objective_layer": "participation", "experiment": ""},
  "text": {
    "body": "One line from a recent discovery review has stayed with me.\nThe customer showed us demand the business could not fulfil. We discussed the report.\nThe report mattered. But it was not yet the problem.\nThe next question should have been: what stopped you from fulfilling the work?\nThe answer could have changed the entire direction. Supply, pricing, geography, response time, credentials, coordination. Or something software would barely influence.\nInstead, the business signal was converted into reporting functionality.\nThat's the danger of discovery scripts. They can keep a conversation moving while the thinking stands still.\nI'm starting to judge discovery by a much smaller unit: did the next question earn the answer that came before it?\nWhat answer would make you abandon your discovery script for five minutes?",
    "slides": [],
    "regions": [],
    "alt_text": "A discovery conversation branches between following a fixed checklist and following a business signal through consequence, cause, options, and decision.",
    "poll_options": []
  }
}
```

Expected result: validation PASS; lint PASS; gate FAIL (release_permission is internal_only and approval state is needs_human_review); render produced with INTERNAL watermark; render report records certainty = inferred treatment, motion role orient with static fallback available, no moves dropped for text_post.

## 8. What to report back to the content side

Reply in the Claude Code thread with, in this order: (1) the field-to-component map from 4.3, verbatim; (2) the list of fields Carry cannot represent and why; (3) any place where the design brief's own vocabulary (four moves, certainty, motion roles) and this schema disagree, with a recommendation but no unilateral change; (4) the LinkedIn poll option limits found and the source; (5) anything in this brief that would require rebuilding Carry rather than extending it. Do not change the schema; propose changes as a list. Salman folds accepted changes back into the Notion contract and bumps `schema_version`.

## 9. Out of scope for this thread

Writing or editing content. Choosing formats. Connecting to any social network. Adding brief fields. Publishing anything. Changing the Notion side. Inferring approval from anything other than the two gate fields.
