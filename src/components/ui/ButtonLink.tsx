import type { ReactNode } from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { InternalPath } from '@/types/content';

interface ButtonLinkProps {
  href: InternalPath;
  children: ReactNode;
  className?: string;
}

/**
 * Navy button-style link (header "Book a consultation"): Bold 14/20, 12px/20px padding,
 * 44px tall, 4px radius. Hover darkens to navy-dark.
 */
export function ButtonLink({ href, children, className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-sm bg-navy px-5 py-3 text-button whitespace-nowrap text-white transition-colors hover:bg-navy-dark',
        className,
      )}
    >
      {children}
    </Link>
  );
}
