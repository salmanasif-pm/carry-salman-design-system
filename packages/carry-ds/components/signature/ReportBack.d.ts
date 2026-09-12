export interface ReportBackProps {
  title?: React.ReactNode;
  cameIn?: React.ReactNode;
  changed?: React.ReactNode;
  /** Mandatory: when empty the literal text "Not yet written" renders. Never hidden. */
  unsettled?: React.ReactNode;
  labels?: { cameIn?: string; changed?: string; unsettled?: string };
  wording?: 'system' | 'plain';
  style?: React.CSSProperties;
}
export function ReportBack(props: ReportBackProps): JSX.Element;
