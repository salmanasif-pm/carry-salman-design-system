# Carry v0.9.2 — codebase updates for the Claude Code thread

Written 2026-09-13 from the design-system project. This file is the complete list of changes to apply to `packages/carry-ds/` and the work to do on top. Everything below is decided; do not re-open design questions. The full design system is NOT re-shipped — apply these diffs to the v0.9.1 package you already have.

Open the thread with: *"Read docs/content-os/CODEBASE_UPDATES_v0.9.2.md. Apply Part A verbatim, then deliver Part B in order. Stop and report after B.3."*

---

## Part A — apply to `packages/carry-ds/` (design-side changes, already made in the design tool)

### A.1 New files (create exactly)

**`docs/content-os/CONTENT_BRIEF_HANDOFF.md`** — the content-side brief (you have it already; keep it here).

**`scripts/banned-vocabulary.json`**
```json
{
  "schema_version": "1.0",
  "note": "Words that must not appear in text rendered for approved_public. Case-insensitive whole-word match unless 'substring' is set. Content side owns this list; extend it here, not in code.",
  "terms": ["residue","source residue","tension gate","State A","State B","lineage","evidence grade","E1","E2","E3","E4","franchise","territory","gate","gated","Unknown stays Unknown","Risk Label","PS","NHR","DNU","Permitted Use","Voice Pass","objective layer","Content Brief"],
  "characters": [
    {"codepoint":"U+2014","name":"em dash","rule":"block anywhere"},
    {"codepoint":"U+2013","name":"en dash","rule":"block when surrounded by spaces"}
  ]
}
```

**`components/signature/ReportBack.jsx`**
```jsx
import React from 'react';
import { Threshold } from './Threshold.jsx';
/** Reveal card with three fixed sections in fixed order: what came in · what changed · what could not be settled.
 *  The third section is mandatory and never hidden — when empty it renders the literal text "Not yet written". */
export function ReportBack({title, cameIn, changed, unsettled, labels, wording='system', style}) {
  const L = Object.assign({cameIn:'what came in',changed:'what changed',unsettled:'what could not be settled'}, labels||{});
  const lbl = {font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:'var(--sp-3)'};
  const body = {font:'var(--weight-body) var(--text-body)/var(--lh-body) var(--font-body)',color:'var(--ink)',maxWidth:'var(--measure)'};
  const empty = (v)=> v===undefined || v===null || v==='' || (Array.isArray(v) && v.length===0);
  const sec = (k, v, last) => <section data-carry-reportback-section={k} style={{padding:'var(--gap-block) 0',borderTop: k==='cameIn'?'none':'var(--stroke-hair) solid var(--rule)'}}>
    <div style={lbl}>{L[k]}</div>
    <div style={{...body, ...(last && empty(v) ? {color:'var(--ink-3)', fontFamily:'var(--font-truth)', fontSize:'var(--text-truth)'} : null)}}>{last && empty(v) ? 'Not yet written' : v}</div></section>;
  return <div data-carry-reportback style={{display:'flex',flexDirection:'column',...style}}>
    {title && <div style={{font:'var(--weight-handle) var(--text-handle-m)/var(--lh-handle-m) var(--font-handle)',letterSpacing:'var(--ls-handle-m)',color:'var(--ink)'}}>{title}</div>}
    {title && <Threshold fn="transition"/>}
    {sec('cameIn', cameIn)}{sec('changed', changed)}{sec('unsettled', unsettled, true)}</div>;
}
```
**`components/signature/ReportBack.d.ts`**
```ts
export interface ReportBackProps {
  title?: React.ReactNode;
  cameIn?: React.ReactNode;
  changed?: React.ReactNode;
  /** Mandatory: when empty the literal text "Not yet written" renders. Never hidden. */
  unsettled?: React.ReactNode;
  labels?: { cameIn?: string; changed?: string; unsettled?: string };
  wording?: 'system' | 'plain';
  style?: React.CSSProperties;
}
export function ReportBack(props: ReportBackProps): JSX.Element;
```
**`components/signature/ReportBack.prompt.md`** — one line: "Report-back card: three fixed sections in fixed order; third never hides; empty renders 'Not yet written'. Threshold fn 'transition'."

**`components/signature/InternalWatermark.jsx`**
```jsx
import React from 'react';
/** Overlay for artifacts that failed the release gate. Full-surface repeated ink label at low alpha + solid ink top bar. Never ochre, never removable by prop — render it or don't render the artifact. */
export function InternalWatermark({label='INTERNAL · not for distribution', reason, style}) {
  const tile = 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="360" height="200"><text x="0" y="120" transform="rotate(-24 180 100)" font-family="ui-monospace,Menlo,monospace" font-size="16" letter-spacing="2" fill="rgba(23,24,26,.5)">'+label.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</text></svg>');
  return <div data-carry-watermark aria-label={label} style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:9999,...style}}>
    <div style={{position:'absolute',inset:0,backgroundImage:'url("'+tile+'")',backgroundRepeat:'repeat',opacity:.24}}></div>
    <div style={{position:'absolute',left:0,right:0,top:0,height:'var(--watermark-bar-size)',background:'var(--watermark-bar)'}}></div>
    <div style={{position:'absolute',left:0,top:'var(--watermark-bar-size)',background:'var(--watermark-bar)',color:'var(--on-ink)',font:'500 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',padding:'6px 10px'}}>{label}{reason && <span style={{opacity:.7,marginLeft:10,textTransform:'none',letterSpacing:0}}>{reason}</span>}</div></div>;
}
```
**`components/signature/InternalWatermark.d.ts`**
```ts
export interface InternalWatermarkProps { label?: string; reason?: string; style?: React.CSSProperties; }
export function InternalWatermark(props: InternalWatermarkProps): JSX.Element;
```
**`components/signature/InternalWatermark.prompt.md`** — one line: "INTERNAL watermark for gate failures; parent position:relative; no hide prop."

### A.2 Token edits — `tokens/shape.css`
After `--fill-superseded` add:
```css
--fill-proposed:repeating-linear-gradient(0deg,var(--ink) 0 1.5px,transparent 1.5px 5px);/* @kind color */
--stroke-assumed:dotted;/* @kind other */
```
Before the connector block add:
```css
/* INTERNAL watermark — never ochre, never a colour */
--watermark-ink:rgba(23,24,26,.12);/* @kind color */
--watermark-bar:var(--ink);/* @kind color */
--watermark-bar-size:8px;/* @kind spacing */
```

### A.3 `components/signature/StateMark.jsx` — edits
1. After `CARRY_CERTAINTY` export add:
```js
export const BRIEF_CERTAINTY = {confirmed:{certainty:'confirmed'},inferred:{certainty:'provisional',variant:'inferred'},assumed:{certainty:'provisional',variant:'assumed'},proposed:{certainty:'provisional',variant:'proposed'},gated:{certainty:'unknown',gated:true},unresolved:{certainty:'unknown'},undefined:{certainty:'unknown'}};
```
2. After `RLABEL` add:
```js
const PLAIN = {confirmed:'confirmed',provisional:'working view',unknown:'not yet settled',superseded:'superseded'};
const VLABEL = {inferred:'Inferred',assumed:'Assumed',proposed:'Proposed'};
```
3. Signature becomes `StateMark({certainty, variant, gated, gate, owner, clears, review, release, state, label, wording='system', size=14, showLabel=true, style})` with `const plain = wording==='plain';`.
4. Box style: background adds `: variant==='proposed'?'var(--fill-proposed)'` before the `'transparent'` fallback; border becomes ``(cc==='provisional'||cc===undefined)?`var(--stroke) ${variant==='assumed'?'var(--stroke-assumed)':'solid'} var(--ink)`:'none'``.
5. Label logic:
```js
if (!ok) parts.push('invalid certainty: '+String(c)); else if (label) parts.push(label); else if (variant && VLABEL[variant]) parts.push(plain?VLABEL[variant].toLowerCase():VLABEL[variant]); else if (cc) parts.push(plain?PLAIN[cc]:CLABEL[cc]);
if (isGated) parts.push(plain ? ('waiting on '+(gateObj.gate||'a decision')) : ['gated', gateObj.gate?'on '+gateObj.gate:null].filter(Boolean).join(' '));
```
6. Root element adds `data-carry-variant={variant}`.
7. `StateMark.d.ts`: add `variant?: 'inferred' | 'assumed' | 'proposed';` and `wording?: 'system' | 'plain';`; export `BRIEF_CERTAINTY` type.

### A.4 `components/data/Matrix.jsx` — edits
- Signature adds `wording='system'`.
- Cell render: `{o.value==='—'&&wording==='plain'?'none':o.value}`; pass `wording={wording}` to the cell `StateMark`.
- `Matrix.d.ts`: add `wording?: 'system' | 'plain';`.

### A.5 `scripts/release-check.js` — edits
- In `--public` mode load `scripts/banned-vocabulary.json` and warn `[public-vocabulary]` on whole-word hits in `templates/**`.
- Keep all existing FAIL classes.

### A.6 Docs
- `docs/state-architecture.md`: append the "v0.9.2 addendum" (brief certainty map · plain wording rule · ReportBack · InternalWatermark · no gate override).
- `docs/content-os/VOCABULARY_RECONCILIATION.md` and `FIELD_TO_COMPONENT_MAP.md`: copy from the design project (decisions all accepted 2026-09-13).
- `readme.md` components list: add ReportBack, InternalWatermark. Component count is now **21 JSX / 26 exports** (incl. `CARRY_FORMS`, `CARRY_CERTAINTY`, `CARRY_OPERATING_CERTAINTY`, `CARRY_RELEASE`, `BRIEF_CERTAINTY`, `normalizeState`).
- Bump `readme.md` version line to **v0.9.2**. Add `docs/decisions/0007-content-brief-alignment.md`: decision = the three accepted items; reopens if the content side changes schema `certainty` or the banned list.

---

## Part B — build in the repo (code-side; new work)

Constraints from the brief §2 apply as code, not comments. No renderer edits text; no field is inferred from another; gate has no override.

### B.1 `packages/carry-content/schema/content-brief.schema.json`
JSON Schema 2020-12 from brief §6. `additionalProperties:false` everywhere; every enum closed; `schema_version` const `"1.0"`. Required set per §6. Extra validations: `source.is_derivative === false`; `motion_opportunity.static_equivalent` non-empty when `role !== "none"`; `audience_action` must not match `/\b(follow|subscribe|share|like|tag)\b/i`; `evidence[].register_status === "banned"` → fail.

### B.2 `validate-brief` CLI
`node packages/carry-content/bin/validate-brief.js <brief.json>`: schema validation → confidentiality lint (case-insensitive substring of every `confidentiality.exclusions` entry across `text.body`, `text.slides[]`, `text.alt_text`, `text.poll_options[]`, `text.regions[].label`) → banned-vocabulary lint from `scripts/banned-vocabulary.json` (whole-word, case-insensitive; U+2014 anywhere; U+2013 with spaces either side). Print `PASS` or numbered failures; non-zero exit on any failure. Lint runs for internal renders too.

### B.3 `docs/content-os/FIELD_TO_COMPONENT_MAP.md` — verify
Take the design-side draft, verify every row against the actual component props, mark corrections `(verified: changed)`. Commit. **Stop and report per brief §8**: (1) the map verbatim; (2) unrepresentable fields — from reconciliation §8, now reduced to `text.regions[]` and `poll_card`; (3) vocabulary disagreements — reconciliation §1–§4 with the v1.1 proposals (`certainty` drops `gated`; `action_gate` gains `{kind, owner, clears, review}`); (4) LinkedIn poll limits — look up, cite the source and date; (5) nothing requires rebuilding Carry.

### B.4 Renderers (`packages/carry-render/`) — only after Salman reads B.3
Gate first: `release_permission==="approved_public" && human_approval_state==="approved_by_salman"` → public; else mount `InternalWatermark` with `reason` (default) or refuse (config). Certainty via `BRIEF_CERTAINTY[brief.certainty ?? undefined]`; public renders pass `wording="plain"` to `StateMark` and `Matrix`. Layout from `moves`: signal → `Composition.above`; structure + proof → `below` (two labelled rows); movement → `lead`. `narrative_form → Composition.form` per reconciliation §6. Text is inserted verbatim into text nodes; measure overflow with `scrollHeight > clientHeight` and fail with the px measured.
- `text_post`: `.txt` with exact line breaks (no HTML path) + optional 1080² cover carrying only `moves.signal` and the certainty mark.
- `poll_card`: options verbatim + mandatory reasoning prompt; report per-option character count against the limits found in B.3(4).
- `carousel` / `annotated_artifact`: one 1080×1350 section per `text.slides[]`; regions drawn over a from-scratch skeleton (`AnnotatedSkeleton` lives here, not in carry-ds).
- `report_back`: `ReportBack` component; third section rule is in the component.
- Drop order for narrow channels: proof, then structure; when dropped, render `Composition` with `below` empty and `hasTruth=false`, and record it.

### B.5 Fixture
Brief §7 rendered as `text_post` → must produce INTERNAL watermark (gate fails). Add as a test: a public render of this fixture is a failing test.

### B.6 Render report `out/<id>/render-report.json`
`{schema_version, gate:{result, reason}, lint:{result, hits[]}, moves_dropped[], motion:{role, static_used}, overflow[], certainty_treatment, gate_without_owner: bool, wording}`.

### B.7 CI
`release-check.js --public` and `validate-brief` on all fixtures run on every PR.

---

## Not in scope
Writing or editing content · choosing formats · any network integration · adding brief fields · changing the Notion side · inferring approval from anything but the two gate fields · reopening palette, type, threshold, or the three-axis state model.
