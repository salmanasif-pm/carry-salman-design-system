export interface CompositionProps {
  /** Which relationship the line expresses. Picks default labels, tick form and lead prefix. */
  form?: 'handle-truth' | 'claim-support' | 'outcome-enabled' | 'question-conditions' | 'direction-consequence' | 'intention-reflection' | 'observation-development';
  above: React.ReactNode;
  below?: React.ReactNode;
  /** The closing line: decision, next step, open question, what was kept. Optional — observation-development usually omits it. */
  lead?: React.ReactNode;
  leadLabel?: string;
  aboveLabel?: string;
  belowLabel?: string;
  showLabels?: boolean;
  orientation?: 'horizontal' | 'vertical';
  aboveSize?: 'xl' | 'l' | 'm' | 's';
  style?: React.CSSProperties;
}
export function Composition(props: CompositionProps): JSX.Element;
/** The seven forms with their default labels, tick function and lead prefix. Exported by Composition.jsx; declared here so typed consumers can iterate the family. */
export type CarryForm = NonNullable<CompositionProps['form']>;
export const CARRY_FORMS: Record<CarryForm, { above: string; below: string; fn: 'decision' | 'evidence' | 'progression' | 'transition' | 'reflection' | 'separation'; lead: string }>;
