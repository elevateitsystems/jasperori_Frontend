import { getLocale } from 'next-intl/server';

import { supportSlugs } from '@/content/shared';
import { redirect } from '@/i18n/navigation';

/** /[locale]/support has no page of its own: send visitors to the first support page. */
export default async function SupportIndexPage() {
  const locale = await getLocale();
  redirect({ href: `/support/${supportSlugs[0]}`, locale });
}
