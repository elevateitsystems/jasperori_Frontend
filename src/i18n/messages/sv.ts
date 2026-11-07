import type { UiMessages } from '@/types/messages';

export const sv = {
  lang: {
    en: 'EN',
    sv: 'SV',
    enName: 'English',
    svName: 'Svenska',
  },
  a11y: {
    skipToContent: 'Hoppa till innehållet',
    openMenu: 'Öppna menyn',
    closeMenu: 'Stäng menyn',
    switchLanguage: 'Byt språk',
    mainNavigation: 'Huvudnavigering',
    homeLink: '{siteName} – startsida',
    newTab: '(öppnas i en ny flik)',
  },
  error: {
    eyebrow: 'Något gick fel',
    title: 'Sidan kunde inte laddas',
    text: 'Ett oväntat fel uppstod. Försök igen.',
    retry: 'Försök igen',
    home: 'Gå till startsidan',
  },
} satisfies UiMessages;
