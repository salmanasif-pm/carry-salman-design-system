import React from 'react';
/** Inline connector between nodes. Line style = certainty. Label in the truth register. */
export function Connector({certainty='confirmed', label, direction='right', length=56, style}) {
  const ls = {confirmed:'solid',provisional:'dashed',unknown:'dotted'}[certainty]||'solid';
  const vert = direction==='down';
  return <div data-carry-connector style={{display:'flex',flexDirection:vert?'column':'row',alignItems:'center',gap:'var(--sp-2)',alignSelf:'center',...style}}>
    {label && !vert && <span style={{font:'var(--weight-truth) var(--text-truth-s)/1 var(--font-truth)',color:'var(--ink-3)',whiteSpace:'nowrap'}}>{label}</span>}
    <span aria-hidden="true" style={{display:'block',width:vert?0:length,height:vert?length:0,borderTop:vert?'none':`var(--stroke) ${ls} var(--ink)`,borderLeft:vert?`var(--stroke) ${ls} var(--ink)`:'none',position:'relative'}}>
      <span style={{position:'absolute',right:vert?-3:-1,bottom:vert?-1:-3.5,width:0,height:0,borderStyle:'solid',borderWidth:vert?'6px 3.5px 0 3.5px':'3.5px 0 3.5px 6px',borderColor:vert?'var(--ink) transparent transparent transparent':'transparent transparent transparent var(--ink)'}}></span></span>
    {label && vert && <span style={{font:'var(--weight-truth) var(--text-truth-s)/1 var(--font-truth)',color:'var(--ink-3)'}}>{label}</span>}</div>;
}