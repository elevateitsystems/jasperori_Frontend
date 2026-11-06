import { defineRouting } from 'next-intl/routing';

/**
 * Language routing.
 * - Swedish is the default (Swedish market).
 * - The locale is always in the URL: /sv/..., /en/... (`localePrefix: 'always'`).
 * - Both languages use the same slugs, e.g. /sv/about and /en/about.
 * - Visiting / redirects to the locale saved in the NEXT_LOCALE cookie, else the best match for
 *   the browser's Accept-Language header, else the default locale.
 */
export const routing = defineRouting({
  locales: ['sv', 'en'],
  defaultLocale: 'sv',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
