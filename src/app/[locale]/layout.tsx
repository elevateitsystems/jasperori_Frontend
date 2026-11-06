import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { getContent } from '@/content';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';

import '../globals.css';

/** Pre-render every page for both locales. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { siteName } = await getContent(locale, 'site');

  // Fallback only. Pages set their full title through getPageMetadata (src/lib/metadata.ts).
  return { title: siteName };
}

/**
 * Root layout. The locale comes from the [locale] segment (validated in src/i18n/request.ts,
 * which returns a 404 for unknown locales).
 */
export default async function LocaleLayout({ children }: LayoutProps<'/[locale]'>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <NextIntlClientProvider>
          <main id="main-content">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
