export interface ThresholdProps {
  /** Render a tick at all. False for a plain divider. Default true. */
  hasTruth?: boolean;
  /** What the line is doing here; changes the tick only. */
  fn?: 'decision' | 'evidence' | 'progression' | 'transition' | 'reflection' | 'separation';
  orientation?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}
export function Threshold(props: ThresholdProps): JSX.Element;
