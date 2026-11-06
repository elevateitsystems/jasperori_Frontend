import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: ReactNode;
  /**
   * manrope: ExtraBold 12/16, 2.4px tracking (default).
   * inter:   SemiBold 13/19.5, 1.56px tracking (the Inter sections on Home), in a 20px row.
   */
  font?: 'manrope' | 'inter';
  /** A 24x1px line in the text colour before the label, 12px gap (Home "Services"). */
  withLine?: boolean;
  /** Colour (and any spacing) per use, e.g. "text-purple". */
  className?: string;
}

/** Small uppercase label above a heading. */
export function Eyebrow({ children, font = 'manrope', withLine = false, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        font === 'inter'
          ? 'flex min-h-5 items-center font-inter text-inter-eyebrow'
          : 'text-eyebrow',
        withLine && 'flex items-center gap-3',
        className,
      )}
    >
      {withLine ? <span aria-hidden="true" className="h-px w-6 shrink-0 bg-current" /> : null}
      {children}
    </p>
  );
}
