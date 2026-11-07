import { supportSlugs } from '@/content/shared';
import type { InternalPath } from '@/types/content';

/**
 * Every indexable page (without locale). Used by the sitemap and the Open Graph images. The 404
 * page has no URL of its own. /support only redirects to the first support page, so it is not listed.
 * Add new pages here when you add a route.
 */
export const indexablePaths: readonly InternalPath[] = [
  '/',
  '/about',
  '/services',
  ...supportSlugs.map((slug) => `/support/${slug}` as const),
  '/contact',
  '/booking',
  '/privacy-policy',
  '/cookie-policy',
];
