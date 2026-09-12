export interface ReportBackProps {
  title?: React.ReactNode;
  /** Section 1 — what came in (replies, data, objections). */
  cameIn?: React.ReactNode;
  /** Section 2 — what changed in the author's view. */
  changed?: React.ReactNode;
  /** Section 3 — what could not be settled. Mandatory: when empty the literal text "Not yet written" renders. Never hidden. */
  unsettled?: React.ReactNode;
  labels?: { cameIn?: string; changed?: string; unsettled?: string };
  wording?: 'system' | 'plain';
  style?: React.CSSProperties;
}
export function ReportBack(props: ReportBackProps): JSX.Element;
