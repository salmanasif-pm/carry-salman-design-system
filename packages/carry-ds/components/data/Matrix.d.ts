export interface MatrixProps {
  columns: string[];
  rows: Array<{ label: string; note?: string; emphasis?: boolean; cells: Array<string | { value: React.ReactNode; certainty?: 'confirmed' | 'provisional' | 'unknown'; gated?: boolean | { gate?: string; owner?: string; clears?: string }; /** @deprecated */ state?: string; /** @deprecated */ gate?: string }> }>;
  caption?: string;
  firstColWidth?: string;
  style?: React.CSSProperties;
}
export function Matrix(props: MatrixProps): JSX.Element;
