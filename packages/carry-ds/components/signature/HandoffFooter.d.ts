export interface HandoffFooterProps {
  certainty?: 'confirmed' | 'provisional' | 'unknown' | 'superseded';
  gated?: boolean | { gate?: string; owner?: string; clears?: string; review?: string };
  release?: 'internal' | 'review' | 'approved' | 'restricted';
  /** @deprecated legacy single key */
  state?: string;
  /** e.g. "Ready for review", "Awaiting evidence" */
  stateLabel?: string;
  next?: string;
  owner?: string;
  artifact?: string;
  version?: string;
  date?: string;
  style?: React.CSSProperties;
}
export function HandoffFooter(props: HandoffFooterProps): JSX.Element;
