export interface EvidenceStripProps {
  items: Array<{ label: string; value: React.ReactNode; certainty?: 'confirmed' | 'provisional' | 'unknown' | 'superseded'; gated?: boolean | { gate?: string; owner?: string; clears?: string; review?: string }; release?: 'internal' | 'review' | 'approved' | 'restricted'; source?: string; /** @deprecated */ state?: string; /** @deprecated */ gate?: string }>;
  /** CSS grid-template-columns override. Default 'auto 1fr'. */
  columns?: string;
  style?: React.CSSProperties;
}
export function EvidenceStrip(props: EvidenceStripProps): JSX.Element;
