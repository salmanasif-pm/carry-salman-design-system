export interface BoundaryFrameProps {
  label: string;
  meta?: string;
  children: React.ReactNode;
  /** What sits outside the boundary, shown neutrally — never crossed out. */
  outside?: React.ReactNode;
  outsideLabel?: string;
  /** Named connection points drawn as ochre ports on the right edge. Few, intentional. */
  ports?: string[];
  style?: React.CSSProperties;
}
export function BoundaryFrame(props: BoundaryFrameProps): JSX.Element;
