import { defineRouting } from 'next-intl/routing';

/**
 * Language routing.
 * - Swedish is the default (Swedish market).
 * - The locale is always in the URL: /sv/..., /en/... (`localePrefix: 'always'`).
 * - Both languages use the same slugs, e.g. /sv/about and /en/about.
 * - Visiting / always redirects to the default locale (Swedish), regardless of browser language
 *   preferences or the NEXT_LOCALE cookie.
 */
export const routing = defineRouting({
  locales: ['sv', 'en'],
  defaultLocale: 'sv',
  localePrefix: 'always',
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
