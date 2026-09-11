import React from 'react';
/** The signature rule. fn changes the tick only:
 *  decision (default) solid tick, start · evidence outline tick · progression tick at end · transition tick centred · reflection small tick · separation no tick. */
export function Threshold({hasTruth=true, fn='decision', orientation='horizontal', style}) {
  const V = orientation==='vertical';
  const showTick = hasTruth && fn!=='separation';
  const t = {position:'absolute',width:'var(--tick-size)',height:'var(--tick-size)',background:'var(--signal)',boxSizing:'border-box'};
  if (fn==='evidence') Object.assign(t,{background:'transparent',border:'var(--stroke-strong) solid var(--signal)'});
  if (fn==='reflection') Object.assign(t,{width:'calc(var(--tick-size) * .6)',height:'calc(var(--tick-size) * .6)'});
  const along = fn==='progression' ? (V?{bottom:0}:{right:0}) : fn==='transition' ? (V?{top:'50%',transform:'translateY(-50%)'}:{left:'50%',transform:'translateX(-50%)'}) : (V?{top:0}:{left:0});
  const off = fn==='reflection' ? -2.5 : -5;
  const tick = showTick ? <span aria-hidden="true" style={{...t,...along,...(V?{left:off}:{top:off})}}></span> : null;
  if (V) return <div role="separator" aria-orientation="vertical" data-carry-threshold={fn} style={{position:'relative',width:'var(--stroke-threshold)',alignSelf:'stretch',background:'var(--rule-strong)',margin:'0 var(--threshold-gap)',...style}}>{tick}</div>;
  return <div role="separator" data-carry-threshold={fn} style={{position:'relative',height:'var(--stroke-threshold)',background:'var(--rule-strong)',margin:'var(--threshold-gap) 0',...style}}>{tick}</div>;
}
