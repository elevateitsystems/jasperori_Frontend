'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { InternalLinkItem } from '@/types/content';

interface NavLinksProps {
  links: InternalLinkItem[];
  variant: 'desktop' | 'mobile';
}

/** First path segment, e.g. '/support/support-02' -> 'support', '/' -> ''. */
function section(path: string): string {
  return path.split('/')[1] ?? '';
}

/**
 * A nav link is current on its own page and on every page in the same section, e.g. "Support"
 * (which links to the first support page) is current on all support pages. Home only on '/'.
 */
function isCurrent(linkHref: string, pathname: string): boolean {
  if (linkHref === '/') return pathname === '/';
  return section(linkHref) === section(pathname);
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
            aria-current={isCurrent(link.href, pathname) ? 'page' : undefined}
            className={cn(
              'text-navy/75 transition-colors hover:text-navy aria-[current=page]:text-navy',
              // Desktop: the text style is on the list so the row is exactly 20px tall.
              variant === 'desktop'
                ? 'touch-target block'
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
