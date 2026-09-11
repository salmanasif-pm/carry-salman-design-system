import React from 'react';
import { StateMark } from '../signature/StateMark.jsx';
/** Staged path — signal → framing → validation → controlled test → decision → execution — instead of a miraculous before/after arrow. */
export function ProgressionLadder({steps=[], current, orientation='horizontal', style}) {
  const H = orientation==='horizontal';
  return <ol data-carry-ladder style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:H?'row':'column',gap:H?0:'var(--sp-4)',alignItems:H?'flex-start':'stretch',...style}}>
    {steps.map((s,i)=>{const on=i===current;const done=current!=null&&i<current;return <li key={i} style={{flex:H?'1 1 0':'none',minWidth:0,display:'flex',flexDirection:H?'column':'row',gap:'var(--sp-3)',alignItems:H?'stretch':'flex-start'}}>
      <div style={{display:'flex',alignItems:'center',gap:0,width:H?'auto':24,flexDirection:H?'row':'column'}}>
        <span style={{width:H?'100%':2,height:H?2:'100%',background:i===0?'transparent':(done||on?'var(--ink)':'var(--rule)'),flex:1}}></span>
        <span style={{width:on?14:10,height:on?14:10,flex:'none',background:done||on?'var(--ink)':'var(--surface)',border:'var(--stroke) solid var(--ink)',boxSizing:'border-box',outline:on?'3px solid var(--signal)':'none',outlineOffset:2}}></span>
        <span style={{width:H?'100%':2,height:H?2:'100%',background:i===steps.length-1?'transparent':(done?'var(--ink)':'var(--rule)'),flex:1}}></span></div>
      <div style={{padding:H?'0 var(--sp-3)':0}}>
        <div style={{font:`${on?'var(--weight-body-strong)':'var(--weight-body)'} var(--text-body-s)/1.3 var(--font-handle)`,color:done||on?'var(--ink)':'var(--ink-3)'}}>{s.label}</div>
        {s.note && <div style={{font:'var(--weight-truth) var(--text-truth-s)/var(--lh-truth-s) var(--font-truth)',color:'var(--ink-3)',marginTop:'var(--sp-1)'}}>{s.note}</div>}
        {(s.certainty||s.state||s.gated) && <div style={{marginTop:'var(--sp-2)'}}><StateMark certainty={s.certainty} state={s.state} gated={s.gated ?? (s.gate?{gate:s.gate}:undefined)} size={10}/></div>}</div></li>;})}</ol>;
}