import type { ReactNode } from 'react';
import { CARRY_MODES } from '../ds';

export const CERTAINTY = ['confirmed', 'provisional', 'unknown', 'superseded'] as const;
export const RELEASE = ['none', 'internal', 'review', 'approved', 'restricted'] as const;
export type StateArgs = { certainty: (typeof CERTAINTY)[number]; gated: boolean; release: (typeof RELEASE)[number]; mode: (typeof CARRY_MODES)[number]; ground: 'paper' | 'graphite' };

/** The three axes as controls, plus mode and ground. Shared by every state-bearing story. */
export const stateArgTypes = {
  certainty: { control: { type: 'select' }, options: CERTAINTY, defaultValue: 'provisional' },
  gated: { control: { type: 'boolean' }, defaultValue: false },
  release: { control: { type: 'select' }, options: RELEASE, defaultValue: 'none' },
  mode: { control: { type: 'select' }, options: CARRY_MODES, defaultValue: 'executive' },
  ground: { control: { type: 'select' }, options: ['paper', 'graphite'], defaultValue: 'paper' },
} as const;
export const stateArgs: StateArgs = { certainty: 'provisional', gated: false, release: 'none', mode: 'executive', ground: 'paper' };
export const gate = (on: boolean) => (on ? { gate: '[condition]', owner: '[named owner]', clears: '[what has to be true]' } : false);
export const rel = (r: StateArgs['release']) => (r === 'none' ? undefined : r);

/** Applies mode and ground tokens around a story. Graphite outside personal mode is a mode-dependent choice, shown here for inspection only. */
export function Frame({ mode, ground, children, width }: { mode: string; ground: string; children: ReactNode; width?: number | string }) {
  return <div data-carry-mode={mode} data-carry-ground={ground} style={{ background: 'var(--ground)', color: 'var(--ink)', padding: 'var(--sp-6)', maxWidth: width ?? 'var(--measure)' }}>{children}</div>;
}
export const label = { font: '400 var(--text-label)/1 var(--font-truth)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--ink-3)' } as const;
