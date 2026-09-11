import React from 'react';
/** The human layer: what this changes for a person, team or client. One sentence, on the warmth surface. */
export function ConsequenceNote({who='the team', children, style}) {
  return <div data-carry-consequence style={{background:'var(--warmth)',padding:'var(--sp-4) var(--sp-5)',maxWidth:'var(--measure)',...style}}>
    <div style={{font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:'var(--sp-3)'}}>what this changes for {who}</div>
    <div style={{font:'var(--weight-body) var(--text-body-s)/var(--lh-body-s) var(--font-body)',color:'var(--ink)'}}>{children}</div></div>;
}