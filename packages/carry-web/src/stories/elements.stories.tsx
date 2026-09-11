import type { Story } from '@ladle/react';
import 'carry-elements';
import { CARRY_FORM_KEYS } from '../ds';
import { Frame, stateArgTypes, stateArgs, type StateArgs } from './_controls';

export default { title: 'Elements' };
export const CarryComposition: Story<StateArgs & { form: string; interactive: boolean }> = (a) => <Frame mode={a.mode} ground={a.ground} width={960}>
  <carry-composition form={a.form} mode={a.mode} interactive={a.interactive ? '' : undefined} size="m" above="[first read]" below="[exact figure] · [scope] · [source]" lead="[one sentence the reader can act on]" style={{ ['--carry-composition-height' as string]: '480px' }} />
</Frame>;
CarryComposition.storyName = '<carry-composition> · drag or arrow the line; 1–5 snap to modes';
CarryComposition.args = { ...stateArgs, form: 'claim-support', interactive: true };
CarryComposition.argTypes = { ...stateArgTypes, form: { control: { type: 'select' }, options: CARRY_FORM_KEYS } };
