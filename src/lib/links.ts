import type { Href, InternalPath } from '@/types/content';

/** Internal routes start with '/'; they go through the locale-aware Link from src/i18n. */
export function isInternalHref(href: Href): href is InternalPath {
  return href.startsWith('/');
}
