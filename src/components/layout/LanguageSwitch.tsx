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
      className={cn(
        'inline-flex rounded-full bg-cloud p-1 forced-color-adjust-none',
        // Windows High Contrast: system colours, the active language as a highlighted pill.
        'forced-colors:border forced-colors:border-[CanvasText] forced-colors:bg-[Canvas]',
        className,
      )}
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
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              // The two pills touch: their hit areas grow in height only, so they never overlap.
              'touch-target inline-flex items-center justify-center rounded-full px-2.5 py-1.5 text-lang transition-colors [--touch-target-width:100%]',
              isActive
                ? 'bg-white text-navy shadow-switch forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]'
                : 'text-ink-muted hover:text-navy forced-colors:text-[LinkText]',
            )}
          >
            {labels[locale].short}
            <span className="sr-only"> ({labels[locale].name})</span>
          </Link>
        );
      })}
    </div>
  );
}
