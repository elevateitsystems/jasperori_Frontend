import { getLocale } from 'next-intl/server';

import { Prose } from '@/components/sections/Prose';
import { SimplePageHeader } from '@/components/sections/SimplePageHeader';
import { getContent } from '@/content';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('privacyPolicy');
}

/** Text page (no design): compact header + prose built from the existing design language. */
export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const page = await getContent(locale, 'privacyPolicy');

  return (
    <>
      <SimplePageHeader content={page.header} id="privacy-title" />
      <Prose sections={page.sections} contentsLabel={page.contentsLabel} />
    </>
  );
}
