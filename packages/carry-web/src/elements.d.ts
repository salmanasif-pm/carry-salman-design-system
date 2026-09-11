import type { DetailedHTMLProps, HTMLAttributes } from 'react';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'carry-composition': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        form?: string; above?: string; below?: string; lead?: string; 'lead-label'?: string; mode?: string; 'threshold-at'?: string; interactive?: boolean | ''; size?: 'xl' | 'l' | 'm' | 's'; 'show-labels'?: 'true' | 'false';
      };
    }
  }
}
