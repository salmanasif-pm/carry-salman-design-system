export interface WordmarkProps {
  variant?: 'full' | 'name' | 'lockup';
  name?: string;
  title?: string;
  sub?: string;
  /** Font size in px for the name. */
  size?: number;
  style?: React.CSSProperties;
}
export function Wordmark(props: WordmarkProps): JSX.Element;
