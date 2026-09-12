export interface StateMarkProps {
  /** Axis A — what we know. Public: 'confirmed' | 'provisional' | 'unknown'. Operating history only: 'superseded'. */
  certainty?: 'confirmed' | 'provisional' | 'unknown' | 'superseded';
  /** Provisional sub-form from the content brief: inferred (label), assumed (dotted outline), proposed (horizontal hatch). */
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
  /** 'plain' swaps system vocabulary for public wording (working view · not yet settled · waiting on …). */
  wording?: 'system' | 'plain';
  size?: number;
  showLabel?: boolean;
  style?: React.CSSProperties;
}
export function StateMark(props: StateMarkProps): JSX.Element;
/** Content-brief certainty → three-axis state (docs/state-architecture.md v0.9.2 addendum). */
export type BriefCertainty = 'confirmed' | 'inferred' | 'assumed' | 'proposed' | 'gated' | 'unresolved' | 'undefined';
export const BRIEF_CERTAINTY: Record<BriefCertainty, { certainty: 'confirmed' | 'provisional' | 'unknown'; variant?: 'inferred' | 'assumed' | 'proposed'; gated?: boolean }>;
export function normalizeState(p: { certainty?: string; gated?: boolean | object; state?: string }): { certainty?: string; gated?: boolean | object };
