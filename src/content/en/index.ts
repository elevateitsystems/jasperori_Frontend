import type { LocaleContent } from '@/types/content';

import { site } from './site';

/** English content. Must match LocaleContent exactly (checked by `satisfies`). */
export const en = {
  site,
  home: { meta: { title: 'Home' } },
  about: { meta: { title: 'About' } },
  services: { meta: { title: 'Services' } },
  support: { meta: { title: 'Support' } },
  contact: { meta: { title: 'Contact' } },
  booking: { meta: { title: 'Booking' } },
  privacyPolicy: { meta: { title: 'Privacy policy' } },
  cookiePolicy: { meta: { title: 'Cookie policy' } },
  notFound: { meta: { title: 'Page not found' } },
} satisfies LocaleContent;
