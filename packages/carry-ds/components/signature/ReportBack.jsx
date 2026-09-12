import React from 'react';
import { Threshold } from './Threshold.jsx';
/** Reveal card with three fixed sections in fixed order: what came in · what changed · what could not be settled.
 *  The third section is mandatory and never hidden — when empty it renders the literal text "Not yet written". */
export function ReportBack({title, cameIn, changed, unsettled, labels, wording='system', style}) {
  const L = Object.assign({cameIn:'what came in',changed:'what changed',unsettled:'what could not be settled'}, labels||{});
  const lbl = {font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:'var(--sp-3)'};
  const body = {font:'var(--weight-body) var(--text-body)/var(--lh-body) var(--font-body)',color:'var(--ink)',maxWidth:'var(--measure)'};
  const empty = (v)=> v===undefined || v===null || v==='' || (Array.isArray(v) && v.length===0);
  const sec = (k, v, last) => <section data-carry-reportback-section={k} style={{padding:'var(--gap-block) 0',borderTop: k==='cameIn'?'none':'var(--stroke-hair) solid var(--rule)'}}>
    <div style={lbl}>{L[k]}</div>
    <div style={{...body, ...(last && empty(v) ? {color:'var(--ink-3)', fontFamily:'var(--font-truth)', fontSize:'var(--text-truth)'} : null)}}>{last && empty(v) ? 'Not yet written' : v}</div></section>;
  return <div data-carry-reportback style={{display:'flex',flexDirection:'column',...style}}>
    {title && <div style={{font:'var(--weight-handle) var(--text-handle-m)/var(--lh-handle-m) var(--font-handle)',letterSpacing:'var(--ls-handle-m)',color:'var(--ink)'}}>{title}</div>}
    {title && <Threshold fn="transition"/>}
    {sec('cameIn', cameIn)}{sec('changed', changed)}{sec('unsettled', unsettled, true)}</div>;
}