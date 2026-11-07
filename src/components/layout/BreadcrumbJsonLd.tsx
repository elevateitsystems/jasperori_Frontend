import { getLocale } from 'next-intl/server';

import { JsonLd } from '@/components/layout/JsonLd';
import { routing, type Locale } from '@/i18n/routing';
import { getBreadcrumbData } from '@/lib/structured-data';

type BreadcrumbKey = Parameters<typeof getBreadcrumbData>[1];

/** Breadcrumb structured data for an inner page. Put it at the top of the page component. */
export async function BreadcrumbJsonLd({ page }: { page: BreadcrumbKey }) {
  const locale = (await getLocale()) as Locale;
  if (!routing.locales.includes(locale)) return null;
  return <JsonLd data={await getBreadcrumbData(locale, page)} />;
}
