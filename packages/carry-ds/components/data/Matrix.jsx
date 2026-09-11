import React from 'react';
import { StateMark } from '../signature/StateMark.jsx';
/** Bridge-language table: decision matrix, condition grid, RACI, own/support/outside. Structure communicates; cells may carry states. */
export function Matrix({columns=[], rows=[], caption, firstColWidth='minmax(120px,.8fr)', style}) {
  const cellStyle={padding:'var(--sp-3) var(--sp-4)',borderBottom:'var(--stroke-hair) solid var(--rule)',font:'var(--weight-body) var(--text-body-s)/1.4 var(--font-body)',color:'var(--ink)',minWidth:0};
  return <div data-carry-matrix style={{overflowX:'auto',...style}}>
    {caption && <div style={{font:'var(--weight-body-strong) var(--text-body-s)/1.3 var(--font-handle)',marginBottom:'var(--sp-3)'}}>{caption}</div>}
    <div role="table" style={{display:'grid',gridTemplateColumns:`${firstColWidth} repeat(${columns.length},minmax(96px,1fr))`}}>
      <div role="columnheader" style={{...cellStyle,borderBottom:'var(--stroke-threshold) solid var(--rule-strong)'}}></div>
      {columns.map((c,i)=><div key={i} role="columnheader" style={{...cellStyle,borderBottom:'var(--stroke-threshold) solid var(--rule-strong)',font:'400 var(--text-label)/1.3 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',color:'var(--ink-3)'}}>{c}</div>)}
      {rows.map((r,ri)=><React.Fragment key={ri}>
        <div role="rowheader" style={{...cellStyle,font:'var(--weight-body-strong) var(--text-body-s)/1.4 var(--font-handle)',background:r.emphasis?'var(--warmth)':'transparent'}}>{r.label}{r.note && <div style={{font:'var(--weight-truth) var(--text-truth-s)/1.4 var(--font-truth)',color:'var(--ink-3)',fontWeight:400}}>{r.note}</div>}</div>
        {r.cells.map((c,ci)=>{const o=typeof c==='object'&&c!==null?c:{value:c};return <div key={ci} role="cell" style={{...cellStyle,background:r.emphasis?'var(--warmth)':'transparent',display:'flex',gap:'var(--sp-3)',alignItems:'flex-start'}}>{(o.certainty||o.state||o.gated) && <StateMark certainty={o.certainty} state={o.state} gated={o.gated ?? (o.gate?{gate:o.gate}:undefined)} showLabel={false} size={11} style={{width:'0.75em',height:'0.75em'}}/>}<span style={o.value==='—'?{color:'var(--ink-4)'}:null}>{o.value}</span></div>;})}
      </React.Fragment>)}</div></div>;
}