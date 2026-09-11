import React from 'react';
/** Web/product action. Square corners, ink fill. 'signal' only for the one action the artifact asks for. */
export function Button({variant='primary', size='md', children, disabled=false, onClick, type='button', style}) {
  const pad = size==='sm'?'8px 12px': size==='lg'?'14px 22px':'11px 16px';
  const fs = size==='sm'?'14px': size==='lg'?'17px':'15px';
  const v = {primary:{background:'var(--ink)',color:'var(--on-ink)',border:'var(--stroke) solid var(--ink)'},
             secondary:{background:'transparent',color:'var(--ink)',border:'var(--stroke) solid var(--ink)'},
             ghost:{background:'transparent',color:'var(--ink-2)',border:'var(--stroke) solid transparent'},
             signal:{background:'var(--signal)',color:'var(--on-signal)',border:'var(--stroke) solid var(--signal)'}}[variant];
  return <button type={type} disabled={disabled} onClick={onClick} style={{...v,padding:pad,font:`600 ${fs}/1 var(--font-handle)`,borderRadius:'var(--radius-control)',cursor:disabled?'not-allowed':'pointer',opacity:disabled?.45:1,minHeight:44,display:'inline-flex',alignItems:'center',gap:8,transition:'background var(--dur-confirm) var(--ease-standard)',...style}}
    onMouseEnter={e=>{if(!disabled&&variant!=='ghost')e.currentTarget.style.filter='brightness(.92)'}} onMouseLeave={e=>{e.currentTarget.style.filter=''}}>{children}</button>;
}