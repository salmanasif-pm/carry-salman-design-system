export interface HandleTruthProps {
  /** What is named or displayed — a short plain phrase. */
  handle: React.ReactNode;
  /** What is actually so — truth-register rows, StateMarks, numbers. */
  truth?: React.ReactNode;
  /** The responsible move or question. Rendered with the ochre "Decision underneath:" prefix. */
  decision?: React.ReactNode;
  handleLabel?: string;
  truthLabel?: string;
  showLabels?: boolean;
  orientation?: 'horizontal' | 'vertical';
  handleSize?: 'xl' | 'l' | 'm' | 's';
  style?: React.CSSProperties;
}
export function HandleTruth(props: HandleTruthProps): JSX.Element;
