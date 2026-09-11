import React from 'react';
import { StateMark } from './StateMark.jsx';
/** Orientation for the absent presenter: current state, next decision, owner, next artifact. */
export function HandoffFooter({certainty, gated, release, state, stateLabel, next, owner, artifact, version, date, style}) {
  const cell=(k,v)=>v?<div key={k} style={{minWidth:0}}><div style={{font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:'var(--sp-2)'}}>{k}</div><div style={{font:'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',color:'var(--ink)'}}>{v}</div></div>:null;
  return <footer data-carry-handoff style={{borderTop:'var(--stroke-threshold) solid var(--rule-strong)',paddingTop:'var(--sp-4)',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'var(--sp-5)',...style}}>
    {(certainty||state||gated||release) && <div><div style={{font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:'var(--sp-2)'}}>state</div><StateMark certainty={certainty} state={state} gated={gated} release={release} label={stateLabel}/></div>}
    {cell('next decision',next)}{cell('owner',owner)}{cell('next artifact',artifact)}{cell('version',[version,date].filter(Boolean).join(' · '))}</footer>;
}