export interface LegendProps {
  states?: Array<'confirmed' | 'provisional' | 'unknown'>;
  /** Show the gated bar sample. Default true. */
  gated?: boolean;
  connectors?: boolean;
  extra?: string[];
  style?: React.CSSProperties;
}
export function Legend(props: LegendProps): JSX.Element;
