import React from 'react';
/** Overlay for artifacts that failed the release gate. Full-surface repeated ink label at low alpha + solid ink top bar. Never ochre, never removable by prop — render it or don't render the artifact. */
export function InternalWatermark({label='INTERNAL · not for distribution', reason, style}) {
  const tile = 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="360" height="200"><text x="0" y="120" transform="rotate(-24 180 100)" font-family="ui-monospace,Menlo,monospace" font-size="16" letter-spacing="2" fill="rgba(23,24,26,.5)">'+label.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</text></svg>');
  return <div data-carry-watermark aria-label={label} style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:9999,...style}}>
    <div style={{position:'absolute',inset:0,backgroundImage:'url("'+tile+'")',backgroundRepeat:'repeat',opacity:.24}}></div>
    <div style={{position:'absolute',left:0,right:0,top:0,height:'var(--watermark-bar-size)',background:'var(--watermark-bar)'}}></div>
    <div style={{position:'absolute',left:0,top:'var(--watermark-bar-size)',background:'var(--watermark-bar)',color:'var(--on-ink)',font:'500 var(--text-label)/1 var(--font-truth)',letterSpacing:'var(--ls-label)',textTransform:'uppercase',padding:'6px 10px'}}>{label}{reason && <span style={{opacity:.7,marginLeft:10,textTransform:'none',letterSpacing:0}}>{reason}</span>}</div></div>;
}