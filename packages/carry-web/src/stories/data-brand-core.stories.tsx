import type { Story } from '@ladle/react';
import { Button, Matrix, Wordmark } from '../ds';
import { Frame, gate, stateArgTypes, stateArgs, type StateArgs } from './_controls';

export default { title: 'Data · Brand · Core' };
const pub = (c: StateArgs['certainty']) => (c === 'superseded' ? 'unknown' : c);

export const Matrix_: Story<StateArgs> = (a) => <Frame mode={a.mode} ground={a.ground} width={960}><Matrix caption="[decision matrix · illustrative structure]" columns={['[option A]', '[option B]']} rows={[
  { label: '[criterion 1]', cells: ['[known]', { value: '[value]', certainty: pub(a.certainty), gated: gate(a.gated) }] },
  { label: '[criterion 2]', note: '[note]', emphasis: true, cells: [{ value: '—', certainty: 'unknown' }, '[known]'] },
]} /></Frame>;
Matrix_.storyName = 'Matrix'; Matrix_.args = stateArgs; Matrix_.argTypes = stateArgTypes;

export const Wordmark_: Story<StateArgs & { variant: 'full' | 'name' | 'lockup'; size: number }> = (a) => <Frame mode={a.mode} ground={a.ground}><Wordmark variant={a.variant} size={a.size} /></Frame>;
Wordmark_.storyName = 'Wordmark'; Wordmark_.args = { ...stateArgs, variant: 'full', size: 32 }; Wordmark_.argTypes = { ...stateArgTypes, variant: { control: { type: 'select' }, options: ['full', 'name', 'lockup'] }, size: { control: { type: 'number' } } };

export const Button_: Story<StateArgs & { variant: 'primary' | 'secondary' | 'ghost' | 'signal'; size: 'sm' | 'md' | 'lg'; disabled: boolean }> = (a) => <Frame mode={a.mode} ground={a.ground}><Button variant={a.variant} size={a.size} disabled={a.disabled}>[action]</Button></Frame>;
Button_.storyName = 'Button'; Button_.args = { ...stateArgs, variant: 'primary', size: 'md', disabled: false }; Button_.argTypes = { ...stateArgTypes, variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'ghost', 'signal'] }, size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] } };
