import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface SectionLabelProps {
  children: ReactNode;
  /**
   * sm: ExtraBold 10/15 uppercase ("02 / What we value"), default.
   * lg: ExtraBold 16px, line height 1.6, 2.2px tracking, uppercase ("01 / Our perspective").
   */
  size?: 'sm' | 'lg';
  /** sm only: 2px (default) or 2.2px letter spacing. */
  tracking?: 'default' | 'wide';
  /** 1px bottom border with 20px padding under the text (border colour via className). */
  divider?: boolean;
  id?: string;
  /** Element; use h2 when the label is the section's only heading (e.g. the Support FAQ). */
  as?: 'p' | 'h2';
  /** Text (and border) colour, e.g. "text-white/60 border-white/20". */
  className?: string;
}

/** Numbered section label, e.g. "01 / Our perspective". */
export function SectionLabel({
  children,
  size = 'sm',
  tracking = 'default',
  divider = false,
  id,
  as: Tag = 'p',
  className,
}: SectionLabelProps) {
  return (
    <Tag
      id={id}
      className={cn(
        size === 'lg'
          ? // 2.2px at 16px = 0.1375em; used only here.
            'text-title-16 leading-[1.6] tracking-[0.1375em] uppercase'
          : cn('text-micro', tracking === 'wide' && 'tracking-caps-22'),
        divider && 'border-b pb-5',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
