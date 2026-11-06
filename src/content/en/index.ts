import type { LocaleContent } from '@/types/content';

import { about } from './about';
import { contact } from './contact';
import { contactStrip } from './contact-strip';
import { home } from './home';
import { services } from './services';
import { site } from './site';
import { supportPages } from './support';

/** English content. Must match LocaleContent exactly (checked by `satisfies`). */
export const en = {
  site,
  contactStrip,
  home,
  about,
  services,
  supportPages,
  contact,
  booking: { meta: { title: 'Book a consultation' } },
  privacyPolicy: { meta: { title: 'Privacy policy' } },
  cookiePolicy: { meta: { title: 'Cookie policy' } },
  notFound: { meta: { title: 'Page not found' } },
} satisfies LocaleContent;
