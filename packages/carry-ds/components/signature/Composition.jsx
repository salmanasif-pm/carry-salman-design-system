import React from 'react';
import { Threshold } from './Threshold.jsx';
/** The Carry composition family. Same DNA — above / line / below — seven relationships. */
export const CARRY_FORMS = {
  'handle-truth':            {above:'the handle',      below:'what is actually going on', fn:'decision',    lead:'Decision underneath'},
  'claim-support':           {above:'the claim',       below:'the support',               fn:'evidence',    lead:'So'},
  'outcome-enabled':         {above:'the outcome',     below:'how it was enabled',        fn:'progression', lead:'Next'},
  'question-conditions':     {above:'the question',    below:'what it depends on',        fn:'evidence',    lead:'Open'},
  'direction-consequence':   {above:'the direction',   below:'what it changes',           fn:'decision',    lead:'Recommendation'},
  'intention-reflection':    {above:'the intention',   below:'what actually happened',    fn:'reflection',  lead:'Kept'},
  'observation-development': {above:'the observation', below:'where it might go',         fn:'transition',  lead:'Still forming'}
};
const SZ = {xl:'var(--text-handle-xl)/var(--lh-handle-xl)',l:'var(--text-handle-l)/var(--lh-handle-l)',m:'var(--text-handle-m)/var(--lh-handle-m)',s:'var(--text-handle-s)/var(--lh-handle-s)'};
const LS = {xl:'var(--ls-handle-xl)',l:'var(--ls-handle-l)',m:'var(--ls-handle-m)',s:'var(--ls-handle-s)'};
export function Composition({form='claim-support', above, below, lead, leadLabel, aboveLabel, belowLabel, showLabels=true, orientation='horizontal', aboveSize='l', style}) {
  const f = CARRY_FORMS[form] || CARRY_FORMS['claim-support'];
  const lbl = {font:'400 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)'};
  const V = orientation==='vertical';
  const prose = form==='intention-reflection' || form==='observation-development';
  return <div data-carry-form={form} style={{display:'flex',flexDirection:V?'row':'column',alignItems:'stretch',...style}}>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-end',gap:'var(--sp-3)',flex:V?'1 1 0':'none',minWidth:0}}>
      {showLabels && <div style={lbl}>{aboveLabel ?? f.above}</div>}
      <div style={{font:'var(--weight-handle) '+SZ[aboveSize]+' var(--font-handle)',letterSpacing:LS[aboveSize],color:'var(--ink)'}}>{above}</div></div>
    <Threshold orientation={orientation} fn={f.fn} hasTruth={!!below}/>
    <div style={{display:'flex',flexDirection:'column',gap:'var(--gap-truth)',flex:V?'1 1 0':'none',minWidth:0}}>
      {showLabels && <div style={lbl}>{belowLabel ?? f.below}</div>}
      <div style={{font:prose?'var(--weight-body) var(--text-body)/var(--lh-body) var(--font-body)':'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)',color:'var(--ink)'}}>{below}</div>
      {lead && <div style={{marginTop:'var(--gap-block)',font:'var(--weight-decision) var(--text-decision)/var(--lh-decision) var(--font-handle)',letterSpacing:'var(--ls-decision)',color:'var(--ink)'}}><span style={{color:'var(--signal-text)'}}>{(leadLabel ?? f.lead)}: </span>{lead}</div>}</div></div>;
}
