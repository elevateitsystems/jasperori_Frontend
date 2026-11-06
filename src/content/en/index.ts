import type { LocaleContent } from '@/types/content';

import { about } from './about';
import { contactStrip } from './contact-strip';
import { home } from './home';
import { services } from './services';
import { site } from './site';

/** English content. Must match LocaleContent exactly (checked by `satisfies`). */
export const en = {
  site,
  contactStrip,
  home,
  about,
  services,
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
