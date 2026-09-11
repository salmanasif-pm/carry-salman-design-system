import React from 'react';
/** Source ancestry: what this came from, what changed, what it supersedes. Respects --provenance-lines per mode unless maxLines is set. */
export function Provenance({sources=[], version, date, supersedes, changed, maxLines, style}) {
  const rows=[]; sources.forEach(s=>rows.push(['src',s])); if(version||date) rows.push(['ver',[version,date].filter(Boolean).join(' · ')]); if(supersedes) rows.push(['supersedes',supersedes]); if(changed) rows.push(['changed',changed]);
  const lim = maxLines ?? 99; const shown = rows.slice(0,lim);
  return <div data-carry-provenance style={{font:'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',color:'var(--ink-3)',display:'grid',gridTemplateColumns:'auto 1fr',gap:'var(--sp-1) var(--sp-4)',...style}}>
    {shown.map(([k,v],i)=><React.Fragment key={i}><span>{k}</span><span style={{color:'var(--ink-2)'}}>{v}</span></React.Fragment>)}
    {rows.length>shown.length && <><span></span><span>+{rows.length-shown.length} more in the working copy</span></>}</div>;
}