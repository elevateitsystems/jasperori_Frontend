import type { AnchorHref, Href, InternalPath } from '@/types/content';

/** Internal routes start with '/'; they go through the locale-aware Link from src/i18n. */
export function isInternalHref(href: Href): href is InternalPath {
  return href.startsWith('/');
}

/** A section on the same page: '#' followed by an id ('#' alone is a placeholder, not an anchor). */
export function isAnchorHref(href: string): href is AnchorHref {
  return href.startsWith('#') && href.length > 1;
}
