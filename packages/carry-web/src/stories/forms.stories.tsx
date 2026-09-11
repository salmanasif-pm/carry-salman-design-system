import type { Story } from '@ladle/react';
import { Composition } from '../ds';
import { Frame, stateArgTypes, stateArgs, type StateArgs } from './_controls';

export default { title: 'Seven forms' };
const make = (form: string, above: string, below: string, lead?: string): Story<StateArgs> => {
  const S: Story<StateArgs> = (a) => <Frame mode={a.mode} ground={a.ground}><Composition form={form as never} above={above} below={below} lead={lead} aboveSize="m" /></Frame>;
  S.storyName = form; S.args = stateArgs; S.argTypes = stateArgTypes; return S;
};
export const HandleTruth = make('handle-truth', '[the handle]', '[what is actually going on]', '[decision underneath]');
export const ClaimSupport = make('claim-support', '[the claim]', '[the support]', '[so: what to do]');
export const OutcomeEnabled = make('outcome-enabled', '[the outcome]', '[how it was enabled]', '[next]');
export const QuestionConditions = make('question-conditions', '[the question]', '[what it depends on]', '[open]');
export const DirectionConsequence = make('direction-consequence', '[the direction]', '[what it changes]', '[recommendation]');
export const IntentionReflection = make('intention-reflection', '[the intention]', '[what actually happened]', '[kept]');
export const ObservationDevelopment = make('observation-development', '[the observation]', '[where it might go]');
