import React from 'react';
import { StateMark } from '../signature/StateMark.jsx';
/** A thing that carries or receives load in a system. Certainty on the edge (solid/dashed/dotted); a gate is a bar across the top. */
export function LoadNode({title, subtitle, certainty, gated, state, kind='service', owner, carries=false, style}) {
  const g = gated ?? (state==='gated');
  state = certainty ?? (state==='gated'?'provisional':(state||'confirmed'));
  const border = state==='provisional'?'var(--stroke) dashed var(--ink)': state==='unknown'?'var(--stroke) dotted var(--ink)':'var(--stroke) solid var(--ink)';
  return <div data-carry-node={kind} style={{background:carries?'var(--ink)':'var(--surface)',color:carries?'var(--on-ink)':'var(--ink)',border,padding:'var(--sp-4) var(--sp-5)',minWidth:140,display:'flex',flexDirection:'column',gap:'var(--sp-2)',position:'relative',...style}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:'var(--sp-3)',font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:carries?'var(--ink-4)':'var(--ink-3)'}}><span>{kind}</span>{owner && <span>{owner}</span>}</div>
    <div style={{font:'var(--weight-body-strong) var(--text-body-s)/1.3 var(--font-handle)'}}>{title}</div>
    {subtitle && <div style={{font:'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',color:carries?'var(--ink-4)':'var(--ink-2)'}}>{subtitle}</div>}
    {(state!=='confirmed'||g) && <div style={{marginTop:'var(--sp-2)'}}><StateMark certainty={state} gated={g} size={10} style={carries?{color:'var(--on-ink)'}:null}/></div>}
    {g && <span aria-hidden="true" style={{position:'absolute',left:-1.5,right:-1.5,top:-1.5,height:6,background:'var(--ink)'}}></span>}</div>;
}