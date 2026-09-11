export interface ConnectorProps {
  certainty?: 'confirmed' | 'provisional' | 'unknown';
  label?: string;
  direction?: 'right' | 'down';
  length?: number;
  style?: React.CSSProperties;
}
export function Connector(props: ConnectorProps): JSX.Element;
