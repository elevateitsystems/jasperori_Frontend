import type { UiMessages } from '@/types/messages';

export const en = {
  lang: {
    en: 'EN',
    sv: 'SV',
    enName: 'English',
    svName: 'Svenska',
  },
  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Switch language',
    mainNavigation: 'Main navigation',
    homeLink: '{siteName} – home',
    newTab: '(opens in a new tab)',
  },
  error: {
    eyebrow: 'Something went wrong',
    title: 'This page could not be loaded',
    text: 'An unexpected error occurred. Please try again.',
    retry: 'Try again',
    home: 'Go to homepage',
  },
} satisfies UiMessages;
