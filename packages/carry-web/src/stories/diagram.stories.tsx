import type { Story } from '@ladle/react';
import { BoundaryFrame, Connector, Legend, LoadLane, LoadNode, ProgressionLadder } from '../ds';
import { Frame, gate, stateArgTypes, stateArgs, type StateArgs } from './_controls';

export default { title: 'Diagram' };
const pub = (c: StateArgs['certainty']) => (c === 'superseded' ? 'unknown' : c);

export const LoadNode_: Story<StateArgs & { carries: boolean; kind: string }> = (a) => <Frame mode={a.mode} ground={a.ground}><LoadNode title="[node]" subtitle="[what it does]" kind={a.kind} certainty={pub(a.certainty)} gated={gate(a.gated)} carries={a.carries} owner="[owner]" /></Frame>;
LoadNode_.storyName = 'LoadNode'; LoadNode_.args = { ...stateArgs, carries: false, kind: 'service' }; LoadNode_.argTypes = { ...stateArgTypes, kind: { control: { type: 'select' }, options: ['service', 'store', 'device', 'external', 'team', 'decision', 'gate'] } };

export const LoadLane_: Story<StateArgs & { boundary: boolean }> = (a) => <Frame mode={a.mode} ground={a.ground} width={960}><LoadLane label="[owner]" meta="[scope]" boundary={a.boundary}><div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}><LoadNode title="[node]" certainty="confirmed" carries /><Connector certainty={pub(a.certainty) as never} label="[what crosses]" /><LoadNode title="[node]" certainty={pub(a.certainty)} gated={gate(a.gated)} /></div></LoadLane></Frame>;
LoadLane_.storyName = 'LoadLane'; LoadLane_.args = { ...stateArgs, boundary: false }; LoadLane_.argTypes = stateArgTypes;

export const Connector_: Story<StateArgs & { direction: 'right' | 'down' }> = (a) => <Frame mode={a.mode} ground={a.ground}><Connector certainty={pub(a.certainty) as never} label="[label]" direction={a.direction} length={240} /></Frame>;
Connector_.storyName = 'Connector'; Connector_.args = { ...stateArgs, direction: 'right' }; Connector_.argTypes = { ...stateArgTypes, direction: { control: { type: 'select' }, options: ['right', 'down'] } };

export const BoundaryFrame_: Story<StateArgs> = (a) => <Frame mode={a.mode} ground={a.ground} width={960}><BoundaryFrame label="[what we own]" meta="[scope]" outsideLabel="[outside · not crossed out]" outside={<LoadNode title="[external]" kind="external" certainty="unknown" />} ports={['[port]']}><LoadNode title="[node]" certainty={pub(a.certainty)} gated={gate(a.gated)} carries /></BoundaryFrame></Frame>;
BoundaryFrame_.storyName = 'BoundaryFrame'; BoundaryFrame_.args = stateArgs; BoundaryFrame_.argTypes = stateArgTypes;

export const ProgressionLadder_: Story<StateArgs & { current: number; orientation: 'horizontal' | 'vertical' }> = (a) => <Frame mode={a.mode} ground={a.ground} width={960}><ProgressionLadder orientation={a.orientation} current={a.current} steps={[{ label: '[step 1]', certainty: 'confirmed' }, { label: '[step 2]', certainty: pub(a.certainty), gated: gate(a.gated) }, { label: '[step 3]', certainty: 'unknown', note: '[not yet asked]' }]} /></Frame>;
ProgressionLadder_.storyName = 'ProgressionLadder'; ProgressionLadder_.args = { ...stateArgs, current: 1, orientation: 'horizontal' }; ProgressionLadder_.argTypes = { ...stateArgTypes, current: { control: { type: 'number' } }, orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] } };

export const Legend_: Story<StateArgs & { connectors: boolean }> = (a) => <Frame mode={a.mode} ground={a.ground}><Legend states={['confirmed', 'provisional', 'unknown']} gated={a.gated} connectors={a.connectors} /></Frame>;
Legend_.storyName = 'Legend'; Legend_.args = { ...stateArgs, gated: true, connectors: true }; Legend_.argTypes = stateArgTypes;
