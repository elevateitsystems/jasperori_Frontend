import { getLocale } from 'next-intl/server';

import { SimplePageHeader } from '@/components/sections/SimplePageHeader';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { getContent } from '@/content';

/**
 * Localized 404 page: compact page header + two buttons. Rendered for notFound() and for unknown
 * URLs (catch-all route and unknown support slugs, which the proxy sends here with a 404 status).
 *
 * Next.js only applies metadata exports from the top-level app/not-found file, so the title is
 * set with React's <title> element, which React places in <head>.
 */
export default async function NotFoundPage() {
  const locale = await getLocale();
  const [page, site] = await Promise.all([
    getContent(locale, 'notFound'),
    getContent(locale, 'site'),
  ]);

  return (
    <>
      <title>{`${page.meta.title} | ${site.siteName}`}</title>
      <SimplePageHeader content={page.header} id="not-found-title" />
      <div className="bg-white py-20 lg:py-24">
        <div className="site-container">
          <div className="mx-auto flex max-w-inner flex-col gap-3 sm:flex-row">
            <ButtonLink href={page.actions.home.href}>{page.actions.home.label}</ButtonLink>
            <ButtonLink href={page.actions.contact.href} variant="outline-dark">
              {page.actions.contact.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
