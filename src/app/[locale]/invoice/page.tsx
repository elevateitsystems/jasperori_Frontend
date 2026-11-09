import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { InvoiceBuilder } from '@/components/sections/invoice/InvoiceBuilder';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === 'sv' ? 'Fakturahantering' : 'Invoice management',
    robots: { index: false, follow: false },
  };
}

export default async function InvoicePage() {
  const locale = await getLocale();
  return <InvoiceBuilder locale={locale} />;
}
