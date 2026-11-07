import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { indexablePaths } from '@/lib/pages';
import { siteUrl } from '@/lib/site-env';
import type { InternalPath } from '@/types/content';

const url = (locale: string, path: InternalPath) =>
  new URL(`/${locale}${path === '/' ? '' : path}`, siteUrl).toString();

/**
 * One entry per page and language, each with hreflang alternates (sv, en, x-default -> sv).
 * No 404, redirect or dev pages. Only crawled in production (robots.ts blocks everything else).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: url(locale, path),
      alternates: {
        languages: {
          ...Object.fromEntries(routing.locales.map((alt) => [alt, url(alt, path)])),
          'x-default': url(routing.defaultLocale, path),
        },
      },
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.7,
    })),
  );
}
