export interface ConsequenceNoteProps {
  /** Beneficiary or bearer: "the user", "the on-call engineer", "the client's finance team". */
  who?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function ConsequenceNote(props: ConsequenceNoteProps): JSX.Element;
