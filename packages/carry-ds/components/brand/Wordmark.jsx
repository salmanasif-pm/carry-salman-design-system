import React from 'react';
/** Type-only wordmark. No monogram. 'lockup' sets the name on a threshold with the tick. */
export function Wordmark({variant='full', name='Salman Asif', title='Technical Product Manager', sub='Product Strategy, AI & Complex Platforms', size=44, style}) {
  if (variant==='lockup') return <div style={{display:'inline-block',position:'relative',paddingBottom:6,borderBottom:'var(--stroke-threshold) solid var(--rule-strong)',font:`var(--weight-handle) ${size}px/1 var(--font-handle)`,letterSpacing:'-.02em',color:'var(--ink)',...style}}>{name}<span aria-hidden="true" style={{position:'absolute',left:0,bottom:-5,width:8,height:8,background:'var(--signal)'}}></span></div>;
  if (variant==='name') return <div style={{font:`var(--weight-handle) ${size}px/1 var(--font-handle)`,letterSpacing:'-.03em',color:'var(--ink)',...style}}>{name}</div>;
  return <div style={{display:'flex',gap:size*.9,alignItems:'center',flexWrap:'wrap',...style}}>
    <div style={{font:`var(--weight-handle) ${size}px/1 var(--font-handle)`,letterSpacing:'-.03em',color:'var(--ink)'}}>{name}</div>
    <div style={{font:'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',color:'var(--ink-2)'}}>{title}<br/>{sub}</div></div>;
}