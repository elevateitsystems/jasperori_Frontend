import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { getContent } from '@/content';
import { routing } from '@/i18n/routing';
import type { InternalPath, PageKey, PageMeta, SupportSlug } from '@/types/content';

/** Route of each page (without locale). The 404 page has no URL of its own. */
const pagePaths: Record<Exclude<PageKey, 'notFound'>, InternalPath> = {
  home: '/',
  about: '/about',
  services: '/services',
  contact: '/contact',
  booking: '/booking',
  privacyPolicy: '/privacy-policy',
  cookiePolicy: '/cookie-policy',
};

/** '/about' in 'sv' -> '/sv/about'; '/' -> '/sv'. Relative to metadataBase. */
const localizedPath = (locale: string, path: InternalPath) =>
  `/${locale}${path === '/' ? '' : path}`;

/**
 * Page metadata from content, in the active locale. The title is "<page title> | <site name>"
 * (or the title as-is when `absoluteTitle` is set). It is built here, not with a layout title
 * template, because Next.js does not apply a layout's template to the page in the same segment.
 * With a path, the page also gets its canonical URL and hreflang alternates for both languages.
 */
async function toMetadata(meta: PageMeta, path?: InternalPath): Promise<Metadata> {
  const locale = await getLocale();
  const { siteName } = await getContent(locale, 'site');
  const title = meta.absoluteTitle ? meta.title : `${meta.title} | ${siteName}`;

  return {
    title: { absolute: title },
    description: meta.description,
    alternates: path
      ? {
          canonical: localizedPath(locale, path),
          languages: {
            ...Object.fromEntries(
              routing.locales.map((alternate) => [alternate, localizedPath(alternate, path)]),
            ),
            'x-default': localizedPath(routing.defaultLocale, path),
          },
        }
      : undefined,
    openGraph: {
      title,
      description: meta.description,
      siteName,
      locale: locale === 'sv' ? 'sv_SE' : 'en_GB',
      type: 'website',
      url: path ? localizedPath(locale, path) : undefined,
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
  return toMetadata(meta, key === 'notFound' ? undefined : pagePaths[key]);
}

export async function getSupportPageMetadata(slug: SupportSlug): Promise<Metadata> {
  const locale = await getLocale();
  const supportPages = await getContent(locale, 'supportPages');
  return toMetadata(supportPages[slug].meta, `/support/${slug}`);
}
