import React from 'react';
/** The strongest qualification, failure mode or condition that would change the recommendation. */
export function CounterpointRail({children, label='counterpoint', style}) {
  return <aside data-carry-counterpoint style={{borderTop:'var(--stroke-hair) solid var(--rule)',paddingTop:'var(--sp-4)',maxWidth:'var(--measure)',display:'grid',gridTemplateColumns:'auto 1fr',gap:'var(--sp-5)',...style}}>
    <span style={{font:'400 var(--text-label)/1.4 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)'}}>{label}</span>
    <div style={{font:'var(--weight-body) var(--text-body-s)/var(--lh-body-s) var(--font-body)',color:'var(--ink-2)'}}>{children}</div></aside>;
}