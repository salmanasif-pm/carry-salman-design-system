export interface ProgressionLadderProps {
  steps: Array<{ label: string; note?: string; certainty?: 'confirmed' | 'provisional' | 'unknown'; gated?: boolean | { gate?: string; owner?: string; clears?: string }; /** @deprecated */ state?: string; /** @deprecated */ gate?: string }>;
  /** Index of the current step (ochre ring). Earlier steps render solid. */
  current?: number;
  orientation?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}
export function ProgressionLadder(props: ProgressionLadderProps): JSX.Element;
