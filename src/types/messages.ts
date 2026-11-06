/**
 * Small shared UI strings, loaded through next-intl (useTranslations / getTranslations).
 * Page and site content (navigation, footer, page text) lives in src/content instead.
 */
export interface UiMessages {
  lang: {
    en: string;
    sv: string;
  };
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
  };
}
