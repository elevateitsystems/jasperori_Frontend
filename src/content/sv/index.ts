import type { LocaleContent } from '@/types/content';

import { site } from './site';

/** Swedish content. Must match LocaleContent exactly (checked by `satisfies`). */
export const sv = {
  site,
  home: { meta: { title: 'Hem' } },
  about: { meta: { title: 'Om oss' } },
  services: { meta: { title: 'Tjänster' } },
  support: { meta: { title: 'Support' } },
  contact: { meta: { title: 'Kontakt' } },
  booking: { meta: { title: 'Boka konsultation' } },
  privacyPolicy: { meta: { title: 'Integritetspolicy' } },
  cookiePolicy: { meta: { title: 'Cookiepolicy' } },
  notFound: { meta: { title: 'Sidan hittades inte' } },
} satisfies LocaleContent;
