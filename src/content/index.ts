import type { Locale } from '@/i18n/routing';
import type { ContentKey, LocaleContent } from '@/types/content';

import { en } from './en';
import { sv } from './sv';

/** Every locale must provide the full LocaleContent shape: a missing field is a type error. */
const contentByLocale: Record<Locale, LocaleContent> = { sv, en };

/**
 * The single entry point for content. Components only call this function, so a CMS can later
 * replace the implementation (e.g. a fetch) without touching components. It is async for that
 * reason, even though the local content is available immediately.
 */
export async function getContent<K extends ContentKey>(
  locale: Locale,
  key: K,
): Promise<LocaleContent[K]> {
  return contentByLocale[locale][key];
}
