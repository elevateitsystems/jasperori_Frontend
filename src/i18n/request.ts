import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import * as rootParams from 'next/root-params';

import { messages } from './messages';
import { routing } from './routing';

/**
 * Per-request next-intl config. The locale comes from the [locale] root segment through
 * next/root-params (Next.js 16.3+), so pages stay statically rendered without setRequestLocale.
 * The `locale` argument is only set when a caller overrides it explicitly.
 */
export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (!hasLocale(routing.locales, paramValue)) notFound();
    locale = paramValue;
  }

  return {
    locale,
    messages: messages[locale],
  };
});
