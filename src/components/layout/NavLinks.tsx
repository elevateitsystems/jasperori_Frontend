'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { InternalLinkItem } from '@/types/content';

interface NavLinksProps {
  links: InternalLinkItem[];
  variant: 'desktop' | 'mobile';
}

/**
 * Main navigation links. Client component only to know the current page: it gets
 * aria-current="page" and full navy opacity (the design has no other active style).
 */
export function NavLinks({ links, variant }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={variant === 'desktop' ? 'flex items-center gap-8 text-nav' : 'flex flex-col'}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={pathname === link.href ? 'page' : undefined}
            className={cn(
              'text-navy/75 transition-colors hover:text-navy aria-[current=page]:text-navy',
              // Desktop: the text style is on the list so the row is exactly 20px tall.
              variant === 'desktop'
                ? 'block'
                : 'block border-b border-line py-4 text-title-20 font-semibold',
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
