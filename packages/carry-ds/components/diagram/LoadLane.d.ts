export interface LoadLaneProps {
  label: string;
  /** Owner, environment or scope note. */
  meta?: string;
  children: React.ReactNode;
  /** Draws a strong rule — this lane starts a new boundary (inside/outside, own/support). */
  boundary?: boolean;
  style?: React.CSSProperties;
}
export function LoadLane(props: LoadLaneProps): JSX.Element;
