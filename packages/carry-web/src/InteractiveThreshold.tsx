import { useEffect, useRef, useState } from 'react';
import 'carry-elements';
import type { ThresholdChangeDetail } from 'carry-elements';
import { CARRY_FORM_KEYS, CARRY_MODES } from './ds';

const label = { font: '400 var(--text-label)/1 var(--font-truth)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--ink-3)' } as const;
const mono = { font: 'var(--weight-truth) var(--text-truth)/var(--lh-truth) var(--font-truth)' } as const;

/** Task 4: the threshold is draggable; its position maps to --threshold-at and re-flows the second register. */
export function InteractiveThreshold() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState<string>('claim-support');
  const [state, setState] = useState<ThresholdChangeDetail>({ at: 0.62, mode: 'executive', register: 'scan' });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const on = (e: Event) => setState((e as CustomEvent<ThresholdChangeDetail>).detail);
    el.addEventListener('carry-threshold-change', on);
    return () => el.removeEventListener('carry-threshold-change', on);
  }, []);
  return (
    <section aria-labelledby="threshold" style={{ display: 'grid', gap: 'var(--sp-4)' }}>
      <h2 id="threshold" style={label}>interactive threshold · drag the line, or focus it and use arrows · 1–5 snap to modes</h2>
      <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
        {CARRY_FORM_KEYS.map((f) => (
          <button key={f} type="button" aria-pressed={f === form} onClick={() => setForm(f)}
            style={{ ...label, padding: 'var(--sp-2) var(--sp-3)', background: f === form ? 'var(--ink)' : 'transparent', color: f === form ? 'var(--on-ink)' : 'var(--ink-3)', border: 'var(--stroke-hair) solid var(--rule)', borderRadius: 'var(--radius-control)', cursor: 'pointer' }}>{f}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
        {CARRY_MODES.map((m) => (
          <button key={m} type="button" aria-pressed={state.mode === m} onClick={() => ref.current?.setAttribute('mode', m)}
            style={{ ...label, padding: 'var(--sp-2) var(--sp-3)', background: state.mode === m ? 'var(--ink)' : 'transparent', color: state.mode === m ? 'var(--on-ink)' : 'var(--ink-3)', border: 'var(--stroke-hair) solid var(--rule)', borderRadius: 'var(--radius-control)', cursor: 'pointer' }}>{m}</button>
        ))}
      </div>
      <carry-composition ref={ref} interactive form={form} mode="executive" size="m"
        above="[first read, one line]" below="[exact figure] · [scope] · [source, named]" lead="[one sentence the reader can act on]"
        style={{ border: 'var(--stroke-hair) solid var(--rule)', padding: 'var(--sp-6)', ['--carry-composition-height' as string]: '520px' }} />
      <div style={{ ...mono, color: 'var(--ink-2)' }} aria-live="polite">
        --threshold-at: {state.at.toFixed(2)} · mode: {state.mode ?? 'between modes'} · register: {state.register}
      </div>
    </section>
  );
}
