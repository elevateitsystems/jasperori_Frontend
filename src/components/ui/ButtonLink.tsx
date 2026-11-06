import type { ReactNode } from 'react';

import { Icon } from '@/components/ui/Icon';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { InternalPath } from '@/types/content';

/**
 * Button-style link variants (values from the spec):
 * - primary:       navy, white text, Bold 14/20, 44px tall, 20px side padding (header CTA)
 * - light:         white, navy text, Bold 14/20, 48px tall, 24px side padding, hero glow shadow
 * - outline-light: transparent, 1px white border, white text, 48px tall, 24px side padding
 * - cta:           white, navy text, ExtraBold 14/20, 56px tall, 28px side padding, large CTA shadow
 * All have a 4px radius. Hover only changes colour/shadow/transform, never the layout.
 */
const variants = {
  primary: 'h-11 px-5 bg-navy text-white hover:bg-navy-dark',
  light: 'h-12 px-6 bg-white text-navy shadow-glow hover:bg-cloud',
  'outline-light': 'h-12 px-6 border border-white text-white hover:bg-white/10',
  cta: 'h-14 px-7 bg-white font-extrabold text-navy shadow-cta hover:bg-cloud',
} as const;

export type ButtonVariant = keyof typeof variants;

interface ButtonLinkProps {
  href: InternalPath;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Trailing 16px right arrow, 12px after the label. */
  withArrow?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  withArrow = false,
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center justify-center gap-3 rounded-sm text-button whitespace-nowrap transition-colors',
        variants[variant],
        className,
      )}
    >
      {children}
      {withArrow ? (
        <Icon
          name="arrow-right"
          className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      ) : null}
    </Link>
  );
}
