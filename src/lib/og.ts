import type { Locale } from '@/i18n/routing';
import type { InternalPath } from '@/types/content';

/**
 * Slug of a page in the Open Graph image URL (/{locale}/og/{slug}):
 * '/' -> 'home', '/about' -> 'about', '/support/support-01' -> 'support-01'.
 */
export function ogSlug(path: InternalPath): string {
  return path === '/' ? 'home' : (path.split('/').at(-1) as string);
}

/** Path of the generated Open Graph image of a page, relative to metadataBase. */
export function ogImagePath(locale: Locale | string, path: InternalPath): string {
  return `/${locale}/og/${ogSlug(path)}`;
}
