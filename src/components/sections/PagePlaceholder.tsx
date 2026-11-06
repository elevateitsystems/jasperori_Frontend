import { getLocale } from 'next-intl/server';

import { getContent } from '@/content';
import type { PageKey } from '@/types/content';

interface PagePlaceholderProps {
  pageKey: PageKey;
}

/**
 * Temporary page body: shows only the page name in the active language.
 * Replaced by the real sections in each page's build phase.
 */
export async function PagePlaceholder({ pageKey }: PagePlaceholderProps) {
  const locale = await getLocale();
  const { meta } = await getContent(locale, pageKey);

  return (
    <section className="site-container py-30">
      <h1 className="text-h2 text-navy">{meta.title}</h1>
    </section>
  );
}
