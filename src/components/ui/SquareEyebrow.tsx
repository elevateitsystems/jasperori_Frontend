import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface SquareEyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Eyebrow with a 6x6px red square, 12px gap, ExtraBold 10/15 uppercase, 2.4px tracking,
 * white at 60% (inner-page hero "simple" layout, simple page header).
 */
export function SquareEyebrow({ children, className }: SquareEyebrowProps) {
  return (
    <p
      className={cn('flex items-center gap-3 text-micro tracking-caps-24 text-white/60', className)}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 bg-red" />
      {children}
    </p>
  );
}
