import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { getContent } from '@/content';
import type { PageKey, PageMeta, SupportSlug } from '@/types/content';

/**
 * Page metadata from content, in the active locale. The title is "<page title> | <site name>"
 * (or the title as-is when `absoluteTitle` is set). It is built here, not with a layout title
 * template, because Next.js does not apply a layout's template to the page in the same segment.
 */
async function toMetadata(meta: PageMeta): Promise<Metadata> {
  const locale = await getLocale();
  const { siteName } = await getContent(locale, 'site');
  const title = meta.absoluteTitle ? meta.title : `${meta.title} | ${siteName}`;

  return {
    title: { absolute: title },
    description: meta.description,
    openGraph: {
      title,
      description: meta.description,
      siteName,
      locale: locale === 'sv' ? 'sv_SE' : 'en_GB',
      type: 'website',
      images: meta.image
        ? [
            {
              url: meta.image.src,
              width: meta.image.width,
              height: meta.image.height,
              alt: meta.image.alt,
            },
          ]
        : undefined,
    },
  };
}

export async function getPageMetadata(key: PageKey): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = await getContent(locale, key);
  return toMetadata(meta);
}

export async function getSupportPageMetadata(slug: SupportSlug): Promise<Metadata> {
  const locale = await getLocale();
  const supportPages = await getContent(locale, 'supportPages');
  return toMetadata(supportPages[slug].meta);
}
