'use client';

import { useTranslations } from 'next-intl';

import { SimplePageHeader } from '@/components/sections/SimplePageHeader';
import { ButtonLink } from '@/components/ui/ButtonLink';

/**
 * Localized error boundary for everything inside the site layout (header and footer stay).
 * Client component because Next.js requires it and "Try again" calls `reset`. Strings come from
 * the UI messages (src/i18n/messages), the same way as the other small shared UI texts.
 */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  return (
    <>
      <SimplePageHeader
        content={{ eyebrow: t('eyebrow'), title: t('title'), text: t('text') }}
        id="error-title"
      />
      <div className="bg-white py-20 lg:py-24">
        <div className="site-container">
          <div className="mx-auto flex max-w-inner flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center justify-center rounded-sm bg-navy px-5 text-button text-white transition-colors hover:bg-navy-dark active:translate-y-px"
            >
              {t('retry')}
            </button>
            <ButtonLink href="/" variant="outline-dark">
              {t('home')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
