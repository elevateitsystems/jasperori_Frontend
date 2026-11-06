import type { LocaleContent } from '@/types/content';

import { site } from './site';

/** English content. Must match LocaleContent exactly (checked by `satisfies`). */
export const en = {
  site,
  home: { meta: { title: 'Home' } },
  about: { meta: { title: 'About' } },
  services: { meta: { title: 'Services' } },
  supportPages: {
    'support-01': { meta: { title: 'Support page 01' } },
    'support-02': { meta: { title: 'Support page 02' } },
  },
  contact: { meta: { title: 'Contact' } },
  booking: { meta: { title: 'Book a consultation' } },
  privacyPolicy: { meta: { title: 'Privacy policy' } },
  cookiePolicy: { meta: { title: 'Cookie policy' } },
  notFound: { meta: { title: 'Page not found' } },
} satisfies LocaleContent;
