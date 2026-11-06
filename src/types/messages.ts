/**
 * Small shared UI strings, loaded through next-intl (useTranslations / getTranslations).
 * Page and site content (navigation, footer, page text) lives in src/content instead.
 */
export interface UiMessages {
  lang: {
    /** Visible short labels in the language switch. */
    en: string;
    sv: string;
    /** Accessible names of the language links (each language written in itself). */
    enName: string;
    svName: string;
  };
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    mainNavigation: string;
    /** Accessible name of the logo link. `{siteName}` is replaced with the site name. */
    homeLink: string;
    /** Read by screen readers after links that open in a new tab. */
    newTab: string;
  };
}
