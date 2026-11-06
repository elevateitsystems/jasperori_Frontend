import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
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

/** Support page template: both support pages use it; only the content differs. */
export default async function SupportPage({ params }: PageProps<'/[locale]/support/[slug]'>) {
  const { slug } = await params;
  if (!isSupportSlug(slug)) notFound();

  const locale = await getLocale();
  const supportPages = await getContent(locale, 'supportPages');

  return <PagePlaceholder title={supportPages[slug].meta.title} />;
}
