export interface InternalWatermarkProps {
  label?: string;
  /** Why the gate failed, e.g. "release_permission=internal_only · approval=needs_human_review". */
  reason?: string;
  style?: React.CSSProperties;
}
export function InternalWatermark(props: InternalWatermarkProps): JSX.Element;
