import { getLocale } from 'next-intl/server';

import { Prose } from '@/components/sections/Prose';
import { SimplePageHeader } from '@/components/sections/SimplePageHeader';
import { getContent } from '@/content';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('cookiePolicy');
}

/** Text page (no design): compact header + prose built from the existing design language. */
export default async function CookiePolicyPage() {
  const locale = await getLocale();
  const page = await getContent(locale, 'cookiePolicy');

  return (
    <>
      <SimplePageHeader content={page.header} id="cookie-title" />
      <Prose sections={page.sections} contentsLabel={page.contentsLabel} />
    </>
  );
}
