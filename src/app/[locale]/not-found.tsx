import { getLocale } from 'next-intl/server';

import { getContent } from '@/content';
import { Link } from '@/i18n/navigation';

/**
 * Localized 404 page (temporary layout: page name and a link to the home page).
 *
 * Next.js only applies metadata exports from the top-level app/not-found file, so the title is
 * set with React's <title> element, which React places in <head>.
 */
export default async function NotFoundPage() {
  const locale = await getLocale();
  const [{ meta }, site] = await Promise.all([
    getContent(locale, 'notFound'),
    getContent(locale, 'site'),
  ]);

  return (
    <section className="site-container flex flex-col items-start gap-6 py-30">
      <title>{`${meta.title} | ${site.siteName}`}</title>
      <h1 className="text-h2 text-navy">{meta.title}</h1>
      <Link
        href={site.navigation.home.href}
        className="text-button text-purple underline underline-offset-4"
      >
        {site.navigation.home.label}
      </Link>
    </section>
  );
}
