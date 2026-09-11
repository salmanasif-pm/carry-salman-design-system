import { useEffect, useState } from 'react';
import { CARRY_FORM_KEYS, CARRY_MODES, Composition, HandoffFooter, StateMark, Threshold, Wordmark, type CarryMode } from './ds';

// Scaffold page: proves the workspace consumes the canonical package end to end.
// Content is [placeholder] only. Identity decisions are not made here.
const label = { font: '400 var(--text-label)/1 var(--font-truth)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--ink-3)' } as const;
const PUBLIC_CERTAINTY = ['confirmed', 'provisional', 'unknown'] as const;
const PUBLIC_RELEASE = ['review', 'approved'] as const;

export function App() {
  const [mode, setMode] = useState<CarryMode>('executive');
  const graphite = mode === 'personal';
  useEffect(() => {
    document.body.dataset.carryMode = mode;
    document.body.dataset.carryGround = graphite ? 'graphite' : 'paper';
  }, [mode, graphite]);

  return (
    <main style={{ maxWidth: 'var(--measure, 64ch)', margin: '0 auto', padding: 'var(--sp-8) var(--sp-5)', display: 'grid', gap: 'var(--gap-section)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
        <Wordmark variant="name" />
        <nav aria-label="Carry mode" style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
          {CARRY_MODES.map((m) => (
            <button key={m} type="button" aria-pressed={m === mode} onClick={() => setMode(m)}
              style={{ ...label, padding: 'var(--sp-2) var(--sp-3)', background: m === mode ? 'var(--ink)' : 'transparent', color: m === mode ? 'var(--on-ink)' : 'var(--ink-3)', border: 'var(--stroke-hair) solid var(--rule)', borderRadius: 'var(--radius-control)', cursor: 'pointer' }}>
              {m}
            </button>
          ))}
        </nav>
      </header>

      <section aria-labelledby="forms">
        <h2 id="forms" style={label}>seven forms · [placeholder] content</h2>
        <div style={{ display: 'grid', gap: 'var(--gap-section)', marginTop: 'var(--sp-4)' }}>
          {CARRY_FORM_KEYS.map((form) => (
            <Composition key={form} form={form} aboveSize="s" above="[first read]" below="[exact second read · scope · source]"
              lead={form === 'observation-development' ? undefined : '[one sentence the reader can act on]'} />
          ))}
        </div>
      </section>

      <section aria-labelledby="states">
        <h2 id="states" style={label}>three axes · public keys only</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))', gap: 'var(--sp-4)', marginTop: 'var(--sp-4)' }}>
          {PUBLIC_CERTAINTY.flatMap((certainty) => [false, true].flatMap((gated) => PUBLIC_RELEASE.map((release) => (
            <StateMark key={`${certainty}-${gated}-${release}`} certainty={certainty} release={release}
              gated={gated ? { gate: '[condition]', owner: '[named owner]', clears: '[what has to be true]' } : false}
              label={`${certainty}${gated ? ' · gated' : ''}`} />
          ))))}
        </div>
        <p style={{ marginTop: 'var(--sp-4)', color: 'var(--ink-3)', font: 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)' }}>
          superseded · internal · restricted are operating-only and fail a public build; they are not rendered on this page.
        </p>
      </section>

      <Threshold fn="separation" />
      <HandoffFooter certainty="provisional" release="review" stateLabel="Scaffold" next="[decision · by date]" owner="Salman Asif" artifact="[next artifact]" version="carry-ds 0.9.1 · carry-web 0.1.0" />
    </main>
  );
}
