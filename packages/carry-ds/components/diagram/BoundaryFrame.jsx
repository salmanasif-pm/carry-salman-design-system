import React from 'react';
/** Inside/outside, own/support, committed/optional, now/later — with intentional connection points. Boundaries have dignity: ink frame, no warning colour. */
export function BoundaryFrame({label, meta, children, outside, outsideLabel='outside this commitment', ports=[], style}) {
  return <div data-carry-boundary style={{display:'grid',gridTemplateColumns:outside?'1fr minmax(160px,.4fr)':'1fr',gap:'var(--sp-6)',alignItems:'start',...style}}>
    <div style={{position:'relative',border:'var(--stroke-threshold) solid var(--constraint)',padding:'var(--sp-6) var(--sp-5) var(--sp-5)'}}>
      <div style={{position:'absolute',top:-9,left:'var(--sp-5)',background:'var(--ground)',padding:'0 var(--sp-3)',font:'var(--weight-body-strong) var(--text-body-s)/1 var(--font-handle)',color:'var(--ink)'}}>{label}{meta && <span style={{font:'var(--weight-truth) var(--text-truth-s)/1 var(--font-truth)',color:'var(--ink-3)',marginLeft:'var(--sp-3)'}}>{meta}</span>}</div>
      {children}
      {ports.map((p,i)=><span key={i} title={p} style={{position:'absolute',right:-7,top:`calc(${(i+1)*100/(ports.length+1)}% - 6px)`,width:12,height:12,background:'var(--signal)'}}></span>)}</div>
    {outside && <div style={{padding:'var(--sp-4) 0',borderTop:'var(--stroke-hair) dashed var(--ink-4)'}}><div style={{font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:'var(--sp-3)'}}>{outsideLabel}</div><div style={{font:'var(--weight-body) var(--text-body-s)/var(--lh-body-s) var(--font-body)',color:'var(--ink-2)'}}>{outside}</div></div>}</div>;
}