import type { ReactNode } from 'react';

import { Link } from '@/i18n/navigation';
import { isInternalHref } from '@/lib/links';
import type { LinkItem } from '@/types/content';

interface ContentLinkProps {
  link: LinkItem;
  className?: string;
  /** Screen-reader text added to links that open in a new tab, e.g. "(opens in a new tab)". */
  newTabLabel?: string;
  /** Custom link content; defaults to `link.label`. */
  children?: ReactNode;
}

/**
 * Renders a LinkItem from content: internal routes use the locale-aware Link, everything else
 * (mailto:, https:, '#') a plain <a>. Links marked `openInNewTab` open safely in a new tab.
 */
export function ContentLink({ link, className, newTabLabel, children }: ContentLinkProps) {
  const content = children ?? link.label;

  if (isInternalHref(link.href)) {
    return (
      <Link href={link.href} className={className}>
        {content}
      </Link>
    );
  }

  if (link.openInNewTab) {
    return (
      <a href={link.href} className={className} target="_blank" rel="noopener noreferrer">
        {content}
        {newTabLabel ? <span className="sr-only"> {newTabLabel}</span> : null}
      </a>
    );
  }

  return (
    <a href={link.href} className={className}>
      {content}
    </a>
  );
}
