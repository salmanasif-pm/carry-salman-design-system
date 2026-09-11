import React from 'react';
/** A horizontal band of nodes sharing ownership or boundary. Lanes are ink rules, not coloured bands. */
export function LoadLane({label, meta, children, boundary=false, style}) {
  return <section data-carry-lane style={{display:'grid',gridTemplateColumns:'140px 1fr',gap:'var(--sp-5)',padding:'var(--sp-4) 0',borderTop:boundary?'var(--stroke-threshold) solid var(--rule-strong)':'var(--stroke-hair) solid var(--rule)',...style}}>
    <div><div style={{font:'var(--weight-body-strong) var(--text-body-s)/1.3 var(--font-handle)',color:'var(--ink)'}}>{label}</div>{meta && <div style={{font:'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',color:'var(--ink-3)',marginTop:'var(--sp-1)'}}>{meta}</div>}</div>
    <div style={{display:'flex',gap:'var(--sp-5)',alignItems:'flex-start',flexWrap:'wrap'}}>{children}</div></section>;
}