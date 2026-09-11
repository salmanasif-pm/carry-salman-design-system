import React from 'react';
import { Threshold } from './Threshold.jsx';
/** Specialised first form of Composition: a visible handle (label, metric, request) above the line, what is actually going on below. Use Composition for the other six forms. */
export function HandleTruth({handle, truth, decision, handleLabel='the handle', truthLabel='the operating truth', showLabels=true, orientation='horizontal', handleSize='l', style}) {
  const sz = {xl:'var(--text-handle-xl)/var(--lh-handle-xl)',l:'var(--text-handle-l)/var(--lh-handle-l)',m:'var(--text-handle-m)/var(--lh-handle-m)',s:'var(--text-handle-s)/var(--lh-handle-s)'}[handleSize];
  const ls = {xl:'var(--ls-handle-xl)',l:'var(--ls-handle-l)',m:'var(--ls-handle-m)',s:'var(--ls-handle-s)'}[handleSize];
  const lbl = {font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)'};
  const H = <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-end',gap:'var(--sp-3)',flex:orientation==='vertical'?'1 1 0':'none',minWidth:0}}>
    {showLabels && <div style={lbl}>{handleLabel}</div>}
    <div style={{font:`var(--weight-handle) ${sz} var(--font-handle)`,letterSpacing:ls,color:'var(--ink)'}}>{handle}</div></div>;
  const T = <div style={{display:'flex',flexDirection:'column',gap:'var(--gap-truth)',flex:orientation==='vertical'?'1 1 0':'none',minWidth:0}}>
    {showLabels && <div style={lbl}>{truthLabel}</div>}
    <div style={{font:'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',color:'var(--ink)'}}>{truth}</div>
    {decision && <div style={{marginTop:'var(--gap-block)',font:'var(--weight-decision) var(--text-decision)/var(--lh-decision) var(--font-handle)',letterSpacing:'var(--ls-decision)',color:'var(--ink)'}}><span style={{color:'var(--signal-text)'}}>Decision underneath: </span>{decision}</div>}</div>;
  return <div data-carry-composition="handle-truth" style={{display:'flex',flexDirection:orientation==='vertical'?'row':'column',alignItems:'stretch',...style}}>{H}<Threshold orientation={orientation} hasTruth={!!truth}/>{T}</div>;
}