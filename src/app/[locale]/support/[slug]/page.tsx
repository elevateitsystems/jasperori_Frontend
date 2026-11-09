import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { SupportCta } from '@/components/sections/support/SupportCta';
import { SupportHero } from '@/components/sections/support/SupportHero';
import { SupportServices } from '@/components/sections/support/SupportServices';
import { getContent } from '@/content';
import { isSupportSlug, supportSlugs } from '@/content/shared';
import { getSupportPageMetadata } from '@/lib/metadata';

/** Both support slugs; combined with the layout's locales this pre-renders 2 x 2 pages. */
export function generateStaticParams() {
  return supportSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/support/[slug]'>) {
  const { slug } = await params;
  if (!isSupportSlug(slug)) notFound();
  return getSupportPageMetadata(slug);
}

/**
 * Support catalog page. It presents the service scope and starting prices before a booking CTA.
 */
export default async function SupportPage({ params }: PageProps<'/[locale]/support/[slug]'>) {
  const { slug } = await params;
  if (!isSupportSlug(slug)) notFound();

  const locale = await getLocale();
  const support = (await getContent(locale, 'supportPages'))[slug];

  return (
    <>
      <SupportHero content={support.hero} />
      <SupportServices content={support.services} />
      <SupportCta content={support.cta} />
    </>
  );
}
