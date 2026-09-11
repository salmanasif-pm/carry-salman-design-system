export interface LoadNodeProps {
  title: string;
  subtitle?: string;
  certainty?: 'confirmed' | 'provisional' | 'unknown';
  gated?: boolean | { gate?: string; owner?: string; clears?: string; review?: string };
  /** @deprecated legacy single key */
  state?: string;
  kind?: 'service' | 'store' | 'device' | 'external' | 'team' | 'decision' | 'gate' | string;
  /** Named owner, shown top-right. */
  owner?: string;
  /** True for the node that carries the load — rendered solid ink. At most one or two per diagram. */
  carries?: boolean;
  style?: React.CSSProperties;
}
export function LoadNode(props: LoadNodeProps): JSX.Element;
