export interface ProvenanceProps {
  sources?: string[];
  version?: string;
  date?: string;
  supersedes?: string;
  changed?: string;
  /** Social 1 · Executive 2 · Systems/Evidence all. */
  maxLines?: number;
  style?: React.CSSProperties;
}
export function Provenance(props: ProvenanceProps): JSX.Element;
