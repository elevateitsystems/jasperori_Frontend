import { getLocale } from 'next-intl/server';

import { loadingLabel, SiteLoading } from '@/components/ui/SiteLoading';

export default async function Loading() {
  const locale = await getLocale();
  return <SiteLoading label={locale === 'sv' ? loadingLabel('sv') : loadingLabel('en')} />;
}
