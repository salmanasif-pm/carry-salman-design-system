import React from 'react';
/** One prominent sentence: the decisive interpretation, recommendation or question. One per artifact. */
export function DecisionLine({children, kind='decision', reopens, style}) {
  const prefix = {decision:'Decision',recommendation:'Recommendation',question:'Question',refusal:'Not doing'}[kind] || 'Decision';
  return <div data-carry-decision style={{maxWidth:'var(--measure)',font:'var(--weight-decision) var(--text-decision)/var(--lh-decision) var(--font-handle)',letterSpacing:'var(--ls-decision)',color:'var(--ink)',...style}}>
    <span style={{color:'var(--signal-text)'}}>{prefix}: </span>{children}
    {reopens && <div style={{marginTop:'var(--sp-3)',font:'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',color:'var(--ink-3)'}}>reopens if · {reopens}</div>}</div>;
}