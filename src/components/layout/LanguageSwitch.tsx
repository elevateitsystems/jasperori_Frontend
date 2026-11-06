'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** Order as in the design: EN first, then SV. */
const SWITCH_LOCALES = ['en', 'sv'] as const satisfies readonly Locale[];

interface LanguageSwitchProps {
  className?: string;
}

/**
 * EN/SV switch: a pill track with two pill links. Each link points to the current page in the
 * other language (same path, same support slug). Links rather than buttons, because switching
 * language is navigation and should also work without JavaScript. The active language is marked
 * with aria-current.
 */
export function LanguageSwitch({ className }: LanguageSwitchProps) {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  const labels: Record<Locale, { short: string; name: string }> = {
    en: { short: t('lang.en'), name: t('lang.enName') },
    sv: { short: t('lang.sv'), name: t('lang.svName') },
  };

  return (
    <div
      role="group"
      aria-label={t('a11y.switchLanguage')}
      className={cn('inline-flex rounded-full bg-cloud p-1', className)}
    >
      {SWITCH_LOCALES.map((locale) => {
        const isActive = locale === activeLocale;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            lang={locale}
            aria-label={labels[locale].name}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'inline-flex items-center justify-center rounded-full px-2.5 py-1.5 text-lang transition-colors',
              isActive ? 'bg-white text-navy shadow-switch' : 'text-ink-muted hover:text-navy',
            )}
          >
            {labels[locale].short}
          </Link>
        );
      })}
    </div>
  );
}
