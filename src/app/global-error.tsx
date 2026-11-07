'use client';

import { messages } from '@/i18n/messages';

import './globals.css';

/**
 * Last-resort error page: replaces the whole root layout, so there is no header, footer or
 * locale provider here. It cannot know the language, so it shows Swedish (the default) and
 * English together, using the same messages as the localized error page.
 */
export default function GlobalError({
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  return (
    <html lang="sv">
      <body className="flex min-h-screen items-center bg-navy text-white">
        <main className="site-container py-20">
          {(['sv', 'en'] as const).map((locale) => (
            <section key={locale} lang={locale} className="mb-10 max-w-144">
              <h1 className="text-h2 text-white">{messages[locale].error.title}</h1>
              <p className="mt-3 text-body text-white/80">{messages[locale].error.text}</p>
            </section>
          ))}
          <button
            type="button"
            onClick={reset}
            className="h-12 rounded-sm bg-white px-6 text-button text-navy"
          >
            {messages.sv.error.retry} / {messages.en.error.retry}
          </button>
        </main>
      </body>
    </html>
  );
}
