import React from 'react';
export const CARRY_CERTAINTY = ['confirmed','provisional','unknown'];
/** Content Brief v1 certainty → Carry certainty + variant. 'gated' is not a certainty: unknown + gate. Missing → unresolved. */
export const BRIEF_CERTAINTY = {confirmed:{certainty:'confirmed'},inferred:{certainty:'provisional',variant:'inferred'},assumed:{certainty:'provisional',variant:'assumed'},proposed:{certainty:'provisional',variant:'proposed'},gated:{certainty:'unknown',gated:true},unresolved:{certainty:'unknown'},undefined:{certainty:'unknown'}};
export const CARRY_OPERATING_CERTAINTY = ['superseded'];
export const CARRY_RELEASE = ['internal','review','approved','restricted'];
const CLABEL = {confirmed:'Confirmed',provisional:'Provisional',unknown:'Unknown',superseded:'Superseded'};
const RLABEL = {internal:'internal',review:'review required',approved:'approved',restricted:'restricted'};
/** Plain wording for public renders — none of these words appear in scripts/banned-vocabulary.json. */
const PLAIN = {confirmed:'confirmed',provisional:'working view',unknown:'not yet settled',superseded:'superseded'};
const VLABEL = {inferred:'Inferred',assumed:'Assumed',proposed:'Proposed'};
/** Legacy single key → axes. 'gated' was never a certainty: it maps to provisional + gated. */
export function normalizeState(p){
  let {certainty, gated, state} = p;
  if (state && !certainty){ if (state==='gated'){certainty='provisional'; gated = gated ?? true;} else if (state==='proposed'){certainty='provisional';} else certainty=state; }
  return {certainty, gated};
}
/** Three-axis marker: certainty = fill, actionability = bar, release = text tag. Each axis appears only when given. */
export function StateMark({certainty, variant, gated, gate, owner, clears, review, release, state, label, wording='system', size=14, showLabel=true, style}) {
  const plain = wording==='plain';
  const n = normalizeState({certainty, gated, state});
  const c = n.certainty, g = n.gated;
  const ok = c===undefined || CLABEL[c]!==undefined;
  const cc = ok ? c : 'unknown';
  const gateObj = (typeof g==='object' && g) ? g : {gate, owner, clears, review};
  const isGated = !!g;
  const w = style?.width ?? size, h = style?.height ?? size;
  const box = {width:w,height:h,flex:'none',display:'inline-block',boxSizing:'border-box',position:'relative',marginTop:'.3em',
    background: cc==='confirmed'?'var(--fill-confirmed)': cc==='unknown'?'var(--fill-unknown)': cc==='superseded'?'var(--fill-superseded)': variant==='proposed'?'var(--fill-proposed)':'transparent',
    border: (cc==='provisional'||cc===undefined)?`var(--stroke) ${variant==='assumed'?'var(--stroke-assumed)':'solid'} var(--ink)`:'none'};
  const bar = isGated ? <span aria-hidden="true" style={{position:'absolute',left:-2,right:-2,top:'50%',height:'max(2px,var(--gate-bar-size))',transform:'translateY(-50%)',background:'var(--gate-bar)'}}></span> : null;
  const parts=[];
  if (!ok) parts.push('invalid certainty: '+String(c)); else if (label) parts.push(label); else if (variant && VLABEL[variant]) parts.push(plain?VLABEL[variant].toLowerCase():VLABEL[variant]); else if (cc) parts.push(plain?PLAIN[cc]:CLABEL[cc]);
  if (isGated) parts.push(plain ? ('waiting on '+(gateObj.gate||'a decision')) : ['gated', gateObj.gate?'on '+gateObj.gate:null].filter(Boolean).join(' '));
  const text = parts.join(' · ');
  const meta = isGated ? [gateObj.owner?'owner '+gateObj.owner:null, gateObj.clears?'clears when '+gateObj.clears:null, gateObj.review?'review '+gateObj.review:null].filter(Boolean).join(' · ') : '';
  const rel = release ? (RLABEL[release] || 'invalid release: '+release) : null;
  const outer = {display:'inline-flex',alignItems:'flex-start',gap:8,font:'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',color: ok?'var(--ink)':'var(--signal-text)'};
  if (style){ Object.assign(outer, style); delete outer.width; delete outer.height; }
  return <span style={outer} data-carry-certainty={cc} data-carry-variant={variant} data-carry-gated={isGated?'true':undefined} data-carry-release={release} title={text}>
    <span style={box} aria-hidden="true">{bar}</span>
    {showLabel && <span style={{minWidth:0}}>{text}{meta && <span style={{display:'block',fontSize:'var(--text-truth-s)',color:'var(--ink-3)'}}>{meta}</span>}{rel && <span style={{display:'inline-block',marginLeft:text?8:0,fontSize:'var(--text-label)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)',border:'var(--stroke-hair) solid var(--rule)',padding:'2px 5px',verticalAlign:'1px'}}>{rel}</span>}</span>}</span>;
}
