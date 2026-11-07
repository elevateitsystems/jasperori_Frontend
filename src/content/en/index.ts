import type { LocaleContent } from '@/types/content';

import { about } from './about';
import { booking } from './booking';
import { contact } from './contact';
import { contactStrip } from './contact-strip';
import { cookiePolicy } from './cookie-policy';
import { home } from './home';
import { notFound } from './not-found';
import { privacyPolicy } from './privacy-policy';
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
  booking,
  privacyPolicy,
  cookiePolicy,
  notFound,
} satisfies LocaleContent;
