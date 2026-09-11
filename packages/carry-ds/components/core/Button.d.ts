export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'signal';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
