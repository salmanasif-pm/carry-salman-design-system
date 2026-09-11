import type { GlobalProvider } from '@ladle/react';
import '../src/ds';
/** Every story renders on the paper ground with the design system's tokens. Mode and ground are per-story controls. */
export const Provider: GlobalProvider = ({ children }) => <div style={{ padding: 'var(--sp-6)', background: 'var(--ground)', color: 'var(--ink)', minHeight: '100vh' }}>{children}</div>;
