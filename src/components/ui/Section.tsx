import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface SectionProps {
  children: ReactNode;
  /** Background colour and the exact vertical padding from the spec, e.g. "bg-cloud py-30". */
  className?: string;
  /**
   * content: the 1320px site container (default).
   * inner:   the site container narrowed to the 1136px inner width (centred).
   */
  width?: 'content' | 'inner';
  /** Extra classes for the inner content wrapper. */
  innerClassName?: string;
  /** id of the section heading, for aria-labelledby. */
  labelledBy?: string;
}

/** Page section: background + vertical padding + the site container. */
export function Section({
  children,
  className,
  width = 'content',
  innerClassName,
  labelledBy,
}: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={className}>
      <div className="site-container">
        <div className={cn(width === 'inner' && 'mx-auto max-w-inner', innerClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
