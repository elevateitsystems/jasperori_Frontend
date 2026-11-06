import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { PageHero } from '@/components/sections/PageHero';
import { SupportFaq } from '@/components/sections/support/SupportFaq';
import { SupportHow } from '@/components/sections/support/SupportHow';
import { SupportPaths } from '@/components/sections/support/SupportPaths';
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
 * Support template (spec: design/spec/support.md). Every support page uses it; the content comes
 * from the slug. Hero (simple layout, plain cover fill, support overlay), paths, how it works,
 * FAQ. No contact strip: the FAQ is followed by the footer.
 */
export default async function SupportPage({ params }: PageProps<'/[locale]/support/[slug]'>) {
  const { slug } = await params;
  if (!isSupportSlug(slug)) notFound();

  const locale = await getLocale();
  const support = (await getContent(locale, 'supportPages'))[slug];

  return (
    <>
      <PageHero content={support.hero} layout="simple" overlay="support" id="support-hero-title" />
      <SupportPaths content={support.paths} />
      <SupportHow content={support.how} />
      <SupportFaq content={support.faq} />
    </>
  );
}
