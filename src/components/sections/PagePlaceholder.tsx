import { getLocale } from 'next-intl/server';

import { getContent } from '@/content';
import type { PageKey } from '@/types/content';

type PagePlaceholderProps = { pageKey: PageKey } | { title: string };

/**
 * Temporary page body: shows only the page name in the active language.
 * Replaced by the real sections in each page's build phase.
 */
export async function PagePlaceholder(props: PagePlaceholderProps) {
  let title: string;
  if ('title' in props) {
    title = props.title;
  } else {
    const locale = await getLocale();
    title = (await getContent(locale, props.pageKey)).meta.title;
  }

  return (
    <section className="site-container py-30">
      <h1 className="text-h2 text-navy">{title}</h1>
    </section>
  );
}
