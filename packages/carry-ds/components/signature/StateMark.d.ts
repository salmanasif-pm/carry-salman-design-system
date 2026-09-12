export interface StateMarkProps {
  /** Axis A — what we know. Public: 'confirmed' | 'provisional' | 'unknown'. Operating history only: 'superseded'. */
  certainty?: 'confirmed' | 'provisional' | 'unknown' | 'superseded';
  /** Sub-variant of provisional from the Content Brief: inferred (outline) · assumed (dotted outline) · proposed (horizontal hatch). */
  variant?: 'inferred' | 'assumed' | 'proposed';
  /** Axis B — can someone act now? true, or an object naming gate · owner · what clears it · review date. */
  gated?: boolean | { gate?: string; owner?: string; clears?: string; review?: string };
  gate?: string;
  owner?: string;
  clears?: string;
  review?: string;
  /** Axis C — may it be distributed? Text tag, never colour. Approval never implies the fact is confirmed. */
  release?: 'internal' | 'review' | 'approved' | 'restricted';
  /** @deprecated legacy single key; 'gated' maps to provisional + gated. */
  state?: 'confirmed' | 'provisional' | 'unknown' | 'gated' | 'superseded';
  label?: string;
  /** 'system' (default) uses Carry's internal vocabulary; 'plain' uses public wording that passes scripts/banned-vocabulary.json — required on any approved_public render. */
  wording?: 'system' | 'plain';
  size?: number;
  showLabel?: boolean;
  style?: React.CSSProperties;
}
export function StateMark(props: StateMarkProps): JSX.Element;
export function normalizeState(p: { certainty?: string; gated?: boolean | object; state?: string }): { certainty?: string; gated?: boolean | object };
export const BRIEF_CERTAINTY: Record<string, { certainty: 'confirmed' | 'provisional' | 'unknown'; variant?: 'inferred' | 'assumed' | 'proposed'; gated?: boolean }>;
