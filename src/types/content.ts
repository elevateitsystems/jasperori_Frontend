/**
 * Content types. All visible text, links and images come from typed content (src/content), so a
 * CMS can replace the content source later without touching components.
 */

import type { supportSlugs } from '@/content/shared';

/** Slug of a support page, e.g. 'support-01'. The list lives in src/content/shared.ts. */
export type SupportSlug = (typeof supportSlugs)[number];

/** Internal routes. The locale prefix is added by the locale-aware Link from src/i18n. */
export type InternalPath =
  | '/'
  | '/about'
  | '/services'
  | `/support/${SupportSlug}`
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
  /** Open in a new tab (external links such as social media). */
  openInNewTab?: boolean;
}

/** A link that must stay inside the site (navigation, buttons). */
export interface InternalLinkItem extends LinkItem {
  href: InternalPath;
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
    home: InternalLinkItem;
    about: InternalLinkItem;
    services: InternalLinkItem;
    support: InternalLinkItem;
    contact: InternalLinkItem;
  };
  header: {
    cta: InternalLinkItem;
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
/** One support page. Both support pages share one template; only the content differs. */
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
  /** Keyed by slug, so every language must provide every support page. */
  supportPages: Record<SupportSlug, SupportPageContent>;
  contact: ContactPageContent;
  booking: BookingPageContent;
  privacyPolicy: PrivacyPolicyPageContent;
  cookiePolicy: CookiePolicyPageContent;
  notFound: NotFoundPageContent;
}

export type ContentKey = keyof LocaleContent;

/** Keys of single pages (have page metadata). Support pages are looked up by slug instead. */
export type PageKey = Exclude<ContentKey, 'site' | 'supportPages'>;
