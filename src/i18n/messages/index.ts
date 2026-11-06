import type { Locale } from '@/i18n/routing';
import type { UiMessages } from '@/types/messages';

import { en } from './en';
import { sv } from './sv';

/** Every locale must provide every message: a missing key is a type error. */
export const messages: Record<Locale, UiMessages> = { sv, en };
