import React from 'react';
import { StateMark } from '../signature/StateMark.jsx';
/** Diagram legend: states and connector certainty. Render once per diagram, bottom-left. */
export function Legend({states=['confirmed','provisional','unknown'], gated=true, connectors=true, extra=[], style}) {
  const line=(ls,l)=><span key={l} style={{display:'inline-flex',alignItems:'center',gap:8,font:'var(--weight-truth) var(--text-truth)/1 var(--font-truth)',color:'var(--ink)'}}><span style={{width:28,borderTop:`var(--stroke) ${ls} var(--ink)`}}></span>{l}</span>;
  return <div data-carry-legend style={{display:'flex',flexWrap:'wrap',gap:'var(--sp-3) var(--sp-6)',...style}}>
    {states.map(s=><StateMark key={s} certainty={s} size={11}/>)}{gated && <StateMark certainty="provisional" gated label="gated" size={11}/>}
    {connectors && [line('solid','confirmed link'),line('dashed','provisional'),line('dotted','unknown')]}
    {extra.map((e,i)=><span key={i} style={{font:'var(--weight-truth) var(--text-truth)/1 var(--font-truth)',color:'var(--ink-2)'}}>{e}</span>)}</div>;
}