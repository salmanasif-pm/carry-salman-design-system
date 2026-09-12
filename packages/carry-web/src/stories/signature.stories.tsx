import type { Story } from '@ladle/react';
import { Composition, ConsequenceNote, CounterpointRail, DecisionLine, EvidenceStrip, HandleTruth, HandoffFooter, InternalWatermark, Provenance, ReportBack, StateMark, Threshold, CARRY_FORM_KEYS } from '../ds';
import { Frame, gate, rel, stateArgTypes, stateArgs, type StateArgs } from './_controls';

export default { title: 'Signature' };

type CompArgs = StateArgs & { form: string; above: string; below: string; lead: string; orientation: 'horizontal' | 'vertical'; aboveSize: 'xl' | 'l' | 'm' | 's' };
export const Composition_: Story<CompArgs> = (a) => <Frame mode={a.mode} ground={a.ground} width={a.orientation === 'vertical' ? 960 : undefined}><Composition form={a.form as never} above={a.above} below={a.below} lead={a.lead || undefined} orientation={a.orientation} aboveSize={a.aboveSize} /></Frame>;
Composition_.storyName = 'Composition';
Composition_.args = { ...stateArgs, form: 'claim-support', above: '[first read]', below: '[exact second read · scope · source]', lead: '[one sentence the reader can act on]', orientation: 'horizontal', aboveSize: 'l' };
Composition_.argTypes = { ...stateArgTypes, form: { control: { type: 'select' }, options: CARRY_FORM_KEYS }, orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] }, aboveSize: { control: { type: 'select' }, options: ['xl', 'l', 'm', 's'] } };

export const HandleTruth_: Story<StateArgs & { handle: string; truth: string; decision: string }> = (a) => <Frame mode={a.mode} ground={a.ground}><HandleTruth handle={a.handle} truth={a.truth} decision={a.decision || undefined} /></Frame>;
HandleTruth_.storyName = 'HandleTruth';
HandleTruth_.args = { ...stateArgs, handle: '[the handle]', truth: '[what is actually going on]', decision: '[decision underneath]' };
HandleTruth_.argTypes = stateArgTypes;

export const Threshold_: Story<StateArgs & { fn: string; hasTruth: boolean }> = (a) => <Frame mode={a.mode} ground={a.ground}><Threshold fn={a.fn as never} hasTruth={a.hasTruth} /></Frame>;
Threshold_.storyName = 'Threshold';
Threshold_.args = { ...stateArgs, fn: 'decision', hasTruth: true };
Threshold_.argTypes = { ...stateArgTypes, fn: { control: { type: 'select' }, options: ['decision', 'evidence', 'progression', 'transition', 'reflection', 'separation'] } };

export const StateMark_: Story<StateArgs & { label: string; variant: 'none' | 'inferred' | 'assumed' | 'proposed'; wording: 'system' | 'plain' }> = (a) => <Frame mode={a.mode} ground={a.ground}><StateMark certainty={a.certainty} variant={a.variant === 'none' ? undefined : a.variant} gated={gate(a.gated)} release={rel(a.release)} label={a.label || undefined} wording={a.wording} /></Frame>;
StateMark_.storyName = 'StateMark';
StateMark_.args = { ...stateArgs, label: '', variant: 'none', wording: 'system' };
StateMark_.argTypes = { ...stateArgTypes, variant: { control: { type: 'select' }, options: ['none', 'inferred', 'assumed', 'proposed'] }, wording: { control: { type: 'select' }, options: ['system', 'plain'] } };

export const ReportBack_: Story<StateArgs & { unsettledEmpty: boolean }> = (a) => <Frame mode={a.mode} ground={a.ground}><ReportBack title="[report back]" cameIn="[what came in]" changed="[what changed]" unsettled={a.unsettledEmpty ? undefined : '[what could not be settled]'} /></Frame>;
ReportBack_.storyName = 'ReportBack'; ReportBack_.args = { ...stateArgs, unsettledEmpty: true }; ReportBack_.argTypes = stateArgTypes;

export const InternalWatermark_: Story<StateArgs & { reason: string }> = (a) => <Frame mode={a.mode} ground={a.ground} width={720}><div style={{ position: 'relative', minHeight: 320, padding: 'var(--sp-6)' }}><Composition form="claim-support" above="[first read]" below="[second read]" aboveSize="m" /><InternalWatermark reason={a.reason || undefined} /></div></Frame>;
InternalWatermark_.storyName = 'InternalWatermark'; InternalWatermark_.args = { ...stateArgs, reason: 'release_permission is not approved_public' }; InternalWatermark_.argTypes = stateArgTypes;

export const StateMarkInvalidKey: Story<StateArgs> = (a) => <Frame mode={a.mode} ground={a.ground}><StateMark certainty={'likely' as never} /></Frame>;
StateMarkInvalidKey.storyName = 'StateMark · unknown key renders a visible invalid mark';
StateMarkInvalidKey.args = stateArgs; StateMarkInvalidKey.argTypes = stateArgTypes;

export const DecisionLine_: Story<StateArgs & { kind: 'decision' | 'recommendation' | 'question' | 'refusal'; text: string; reopens: string }> = (a) => <Frame mode={a.mode} ground={a.ground}><DecisionLine kind={a.kind} reopens={a.reopens || undefined}>{a.text}</DecisionLine></Frame>;
DecisionLine_.storyName = 'DecisionLine';
DecisionLine_.args = { ...stateArgs, kind: 'decision', text: '[one sentence the reader can act on]', reopens: '[what would reopen it]' };
DecisionLine_.argTypes = { ...stateArgTypes, kind: { control: { type: 'select' }, options: ['decision', 'recommendation', 'question', 'refusal'] } };

export const EvidenceStrip_: Story<StateArgs> = (a) => <Frame mode={a.mode} ground={a.ground}><EvidenceStrip items={[
  { label: '[observed]', value: '[exact figure · scope]', certainty: a.certainty, gated: gate(a.gated), release: rel(a.release), source: '[named source]' },
  { label: '[believed]', value: '[working belief]', certainty: 'provisional' },
  { label: '[not known]', value: 'Unknown — not yet asked', certainty: 'unknown' },
]} /></Frame>;
EvidenceStrip_.storyName = 'EvidenceStrip'; EvidenceStrip_.args = stateArgs; EvidenceStrip_.argTypes = stateArgTypes;

export const ConsequenceNote_: Story<StateArgs & { who: string; text: string }> = (a) => <Frame mode={a.mode} ground={a.ground}><ConsequenceNote who={a.who}>{a.text}</ConsequenceNote></Frame>;
ConsequenceNote_.storyName = 'ConsequenceNote'; ConsequenceNote_.args = { ...stateArgs, who: '[who]', text: '[what this changes for them]' }; ConsequenceNote_.argTypes = stateArgTypes;

export const CounterpointRail_: Story<StateArgs & { text: string }> = (a) => <Frame mode={a.mode} ground={a.ground}><CounterpointRail>{a.text}</CounterpointRail></Frame>;
CounterpointRail_.storyName = 'CounterpointRail'; CounterpointRail_.args = { ...stateArgs, text: '[the condition that would change the recommendation]' }; CounterpointRail_.argTypes = stateArgTypes;

export const HandoffFooter_: Story<StateArgs & { stateLabel: string }> = (a) => <Frame mode={a.mode} ground={a.ground} width={960}><HandoffFooter certainty={a.certainty} gated={gate(a.gated)} release={rel(a.release)} stateLabel={a.stateLabel} next="[decision · by date]" owner="[named owner]" artifact="[next artifact]" version="carry-ds 0.9.1" /></Frame>;
HandoffFooter_.storyName = 'HandoffFooter'; HandoffFooter_.args = { ...stateArgs, release: 'review', stateLabel: 'Awaiting evidence' }; HandoffFooter_.argTypes = stateArgTypes;

export const Provenance_: Story<StateArgs & { maxLines: number }> = (a) => <Frame mode={a.mode} ground={a.ground}><Provenance sources={['[internal source · named, not linked]', '[self-reported · one function]', '[public source]']} version="0.9.1" date="2026-09-11" maxLines={a.maxLines} /></Frame>;
Provenance_.storyName = 'Provenance'; Provenance_.args = { ...stateArgs, maxLines: 2 }; Provenance_.argTypes = { ...stateArgTypes, maxLines: { control: { type: 'number' } } };
