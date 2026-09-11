// Single import surface for the canonical design system. Components are the .jsx sources in
// packages/carry-ds, typed by their sibling .d.ts files. Nothing here redefines a token or a prop.
import '@carry-ds/styles.css';

export { Composition } from '@carry-ds/components/signature/Composition.jsx';
export { HandleTruth } from '@carry-ds/components/signature/HandleTruth.jsx';
export { Threshold } from '@carry-ds/components/signature/Threshold.jsx';
export { StateMark, normalizeState } from '@carry-ds/components/signature/StateMark.jsx';
export { DecisionLine } from '@carry-ds/components/signature/DecisionLine.jsx';
export { EvidenceStrip } from '@carry-ds/components/signature/EvidenceStrip.jsx';
export { ConsequenceNote } from '@carry-ds/components/signature/ConsequenceNote.jsx';
export { CounterpointRail } from '@carry-ds/components/signature/CounterpointRail.jsx';
export { HandoffFooter } from '@carry-ds/components/signature/HandoffFooter.jsx';
export { Provenance } from '@carry-ds/components/signature/Provenance.jsx';
export { LoadNode } from '@carry-ds/components/diagram/LoadNode.jsx';
export { LoadLane } from '@carry-ds/components/diagram/LoadLane.jsx';
export { Connector } from '@carry-ds/components/diagram/Connector.jsx';
export { BoundaryFrame } from '@carry-ds/components/diagram/BoundaryFrame.jsx';
export { ProgressionLadder } from '@carry-ds/components/diagram/ProgressionLadder.jsx';
export { Legend } from '@carry-ds/components/diagram/Legend.jsx';
export { Matrix } from '@carry-ds/components/data/Matrix.jsx';
export { Wordmark } from '@carry-ds/components/brand/Wordmark.jsx';
export { Button } from '@carry-ds/components/core/Button.jsx';

import type { ComponentProps } from 'react';
import type { Composition as CompositionType } from '@carry-ds/components/signature/Composition.jsx';

/** The seven forms, typed against the component's own prop union. CARRY_FORMS in the .jsx is not declared in its .d.ts. */
export type CarryForm = NonNullable<ComponentProps<typeof CompositionType>['form']>;
export const CARRY_FORM_KEYS = ['handle-truth', 'claim-support', 'outcome-enabled', 'question-conditions', 'direction-consequence', 'intention-reflection', 'observation-development'] as const satisfies readonly CarryForm[];

export const CARRY_MODES = ['executive', 'social', 'systems', 'evidence', 'personal'] as const;
export type CarryMode = (typeof CARRY_MODES)[number];
