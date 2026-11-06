import type { LocaleContent } from '@/types/content';

import { about } from './about';
import { contact } from './contact';
import { contactStrip } from './contact-strip';
import { home } from './home';
import { services } from './services';
import { site } from './site';
import { supportPages } from './support';

/** Swedish content. Must match LocaleContent exactly (checked by `satisfies`). */
export const sv = {
  site,
  contactStrip,
  home,
  about,
  services,
  supportPages,
  contact,
  booking: { meta: { title: 'Boka konsultation' } },
  privacyPolicy: { meta: { title: 'Integritetspolicy' } },
  cookiePolicy: { meta: { title: 'Cookiepolicy' } },
  notFound: { meta: { title: 'Sidan hittades inte' } },
} satisfies LocaleContent;
