import React from 'react';
import { StateMark } from './StateMark.jsx';
/** Compact second-read layer: source, certainty, gate, delta. Mono, one row per item. */
export function EvidenceStrip({items=[], columns, style}) {
  return <div data-carry-evidence style={{display:'grid',gridTemplateColumns:columns||'auto 1fr',gap:'var(--gap-truth) var(--sp-5)',font:'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',color:'var(--evidence)',...style}}>
    {items.map((it,i)=><React.Fragment key={i}>
      <span style={{color:'var(--ink-3)',whiteSpace:'nowrap'}}>{it.label}</span>
      <span style={{display:'flex',gap:'var(--sp-3)',alignItems:'baseline',minWidth:0,color:'var(--ink)'}}>{(it.certainty||it.state||it.gated) && <StateMark certainty={it.certainty} state={it.state} gated={it.gated ?? (it.gate?{gate:it.gate}:undefined)} release={it.release} showLabel={false} size={11} style={{width:'0.85em',height:'0.85em'}}/>}<span>{it.value}</span>{it.source && <span style={{color:'var(--ink-3)',fontSize:'var(--text-truth-s)',whiteSpace:'nowrap'}}>· {it.source}</span>}</span>
    </React.Fragment>)}</div>;
}