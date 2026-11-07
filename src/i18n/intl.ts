import type { Locale } from './routing';

/**
 * BCP 47 locale for Intl formatting per site locale. en-GB gives the design's "Thu 5 Nov" day
 * format (en-US would give "Thu, Nov 5"); sv-SE gives "tors 5 nov.".
 */
export const intlLocales: Record<Locale, string> = {
  sv: 'sv-SE',
  en: 'en-GB',
};
