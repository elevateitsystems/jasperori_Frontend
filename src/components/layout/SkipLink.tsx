import { getTranslations } from 'next-intl/server';

/** First focusable element on every page. Hidden until it gets keyboard focus. */
export async function SkipLink() {
  const t = await getTranslations('a11y');

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-navy focus:px-5 focus:py-3 focus:text-button focus:text-white"
    >
      {t('skipToContent')}
    </a>
  );
}
