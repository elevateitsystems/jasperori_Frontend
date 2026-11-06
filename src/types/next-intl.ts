import type { routing } from '@/i18n/routing';
import type { UiMessages } from '@/types/messages';

/** Strict types for next-intl: only 'sv' | 'en' and only existing message keys are accepted. */
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: UiMessages;
  }
}
