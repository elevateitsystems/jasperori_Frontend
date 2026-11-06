/**
 * Content types. All visible text, links and images come from typed content (src/content), so a
 * CMS can replace the content source later without touching components.
 */

/** Internal routes. The locale prefix is added by the locale-aware Link from src/i18n. */
export type InternalPath =
  | '/'
  | '/about'
  | '/services'
  | '/support'
  | '/contact'
  | '/booking'
  | '/privacy-policy'
  | '/cookie-policy';

/** External targets. '#' is only for links whose real URL is not known yet. */
export type ExternalHref = `https://${string}` | `mailto:${string}` | `tel:${string}` | '#';

export type Href = InternalPath | ExternalHref;

/** A link or button that navigates somewhere. */
export interface LinkItem {
  label: string;
  href: Href;
}

/** An image in public/images. Use an empty alt for purely decorative images. */
export interface ImageAsset {
  src: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
}

/** Page metadata. The title is shown as "<title> | <siteName>". */
export interface PageMeta {
  title: string;
  /** Not in the design yet: add when the client provides it. */
  description?: string;
}

/** Shared content for the header and footer. */
export interface SiteSettings {
  siteName: string;
  navigation: {
    home: LinkItem;
    about: LinkItem;
    services: LinkItem;
    support: LinkItem;
    contact: LinkItem;
  };
  header: {
    cta: LinkItem;
  };
  footer: {
    tagline: string;
    quickLinks: {
      heading: string;
      links: {
        home: LinkItem;
        about: LinkItem;
        services: LinkItem;
        support: LinkItem;
      };
    };
    support: {
      heading: string;
      links: {
        supportPage1: LinkItem;
        supportPage2: LinkItem;
        privacy: LinkItem;
        cookies: LinkItem;
      };
    };
    connect: {
      heading: string;
      links: {
        linkedin: LinkItem;
        facebook: LinkItem;
        email: LinkItem;
      };
    };
    /** Written out (not calculated) so the client can edit the year. */
    copyright: string;
    slogan: string;
  };
}

/** Temporary page content until each page gets its own type in its build phase. */
export interface PlaceholderPageContent {
  meta: PageMeta;
}

export type HomePageContent = PlaceholderPageContent;
export type AboutPageContent = PlaceholderPageContent;
export type ServicesPageContent = PlaceholderPageContent;
export type SupportPageContent = PlaceholderPageContent;
export type ContactPageContent = PlaceholderPageContent;
export type BookingPageContent = PlaceholderPageContent;
export type PrivacyPolicyPageContent = PlaceholderPageContent;
export type CookiePolicyPageContent = PlaceholderPageContent;
export type NotFoundPageContent = PlaceholderPageContent;

/** All content for one locale. Every locale must match this shape exactly. */
export interface LocaleContent {
  site: SiteSettings;
  home: HomePageContent;
  about: AboutPageContent;
  services: ServicesPageContent;
  support: SupportPageContent;
  contact: ContactPageContent;
  booking: BookingPageContent;
  privacyPolicy: PrivacyPolicyPageContent;
  cookiePolicy: CookiePolicyPageContent;
  notFound: NotFoundPageContent;
}

export type ContentKey = keyof LocaleContent;

/** Keys of content entries that are pages (have page metadata). */
export type PageKey = Exclude<ContentKey, 'site'>;
