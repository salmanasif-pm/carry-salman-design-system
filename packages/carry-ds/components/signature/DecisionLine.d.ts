export interface DecisionLineProps {
  children: React.ReactNode;
  /** 'refusal' makes a trade-off or deliberate non-action visible. */
  kind?: 'decision' | 'recommendation' | 'question' | 'refusal';
  /** What would reopen this decision. Decisions name their reopen condition. */
  reopens?: string;
  style?: React.CSSProperties;
}
export function DecisionLine(props: DecisionLineProps): JSX.Element;
