import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { getContent } from '@/content';
import type { PageKey } from '@/types/content';

/**
 * Page metadata from content, in the active locale. The title is "<page title> | <site name>".
 * It is built here (not with a layout title template) because Next.js does not apply a layout's
 * template to the page in the same segment, which would leave the home page without the suffix.
 */
export async function getPageMetadata(key: PageKey): Promise<Metadata> {
  const locale = await getLocale();
  const [{ meta }, { siteName }] = await Promise.all([
    getContent(locale, key),
    getContent(locale, 'site'),
  ]);

  return {
    title: { absolute: `${meta.title} | ${siteName}` },
    description: meta.description,
  };
}
