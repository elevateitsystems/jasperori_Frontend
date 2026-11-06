import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface SeparatedGridProps {
  /** <li> items with their own (opaque) background, e.g. "bg-navy p-8". */
  children: ReactNode;
  /** Columns and spacing, e.g. "mt-12 md:grid-cols-3". */
  className?: string;
}

/**
 * Ordered grid of cards with 1px separator lines between them (Home "Why TechSalem", Contact
 * steps): the list has a white/15 background that shows through 1px gaps between the cards.
 * The lines follow the grid at every breakpoint (between columns and between rows).
 */
export function SeparatedGrid({ children, className }: SeparatedGridProps) {
  return <ol className={cn('grid gap-px bg-white/15', className)}>{children}</ol>;
}
