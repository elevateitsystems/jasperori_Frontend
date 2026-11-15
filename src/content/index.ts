import { cacheLife, cacheTag } from 'next/cache';

import type { Locale } from '@/i18n/routing';
import { readPublished } from '@/lib/db/content';
import type { ContentKey, LocaleContent } from '@/types/content';

/**
 * Published content for the public site. The database is the live source; the files in
 * src/content are the original copy used to seed it and to restore a page.
 * Cached until an admin save calls updateTag, so editing the site does not wait on a timer.
 */
export async function getContent<K extends ContentKey>(
  locale: Locale,
  key: K,
): Promise<LocaleContent[K]> {
  'use cache';
  cacheLife('max');
  cacheTag('content', `content:${locale}:${key}`);
  return await readPublished(locale, key);
}
