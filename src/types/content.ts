/**
 * Content types. All visible text, links and images come from typed content (src/content), so a
 * CMS can replace the content source later without touching components.
 */

import type { supportSlugs } from '@/content/shared';
import type { IconName } from '@/types/icons';

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

/** Page metadata. The title is shown as "<title> | <siteName>" unless `absoluteTitle` is set. */
export interface PageMeta {
  title: string;
  /** Use `title` as the full browser title, without the " | <siteName>" suffix. */
  absoluteTitle?: boolean;
  /** Not in the design yet for most pages: add when the client provides it. */
  description?: string;
  /** Open Graph / social sharing image. */
  image?: ImageAsset;
}

/** Fixed-length lists: both languages must have the same number of items. */
export type Tuple2<T> = [T, T];
export type Tuple3<T> = [T, T, T];
export type Tuple4<T> = [T, T, T, T];
export type Tuple6<T> = [T, T, T, T, T, T];

/** A heading whose last part has another colour; rendered as one heading. */
export interface SplitTitle {
  title: string;
  titleAccent: string;
}

/** Inner-page hero (About, Services, Support, Contact, Booking). */
export interface PageHeroContent {
  eyebrow: string;
  title: string;
  text: string;
  image: ImageAsset;
  primaryCta: InternalLinkItem;
  secondaryCta?: InternalLinkItem;
}

/** "04 / Contact" strip, shared by About and Services. */
export interface ContactStripContent extends SplitTitle {
  label: string;
  /** Each row is a full-width link: `label` on the left, `link.label` (the value) on the right. */
  rows: Tuple3<{ label: string; link: LinkItem }>;
}

/** Reusable call-to-action banner (Home "Let's build what's next"). */
export interface CtaBannerContent {
  title: string;
  text: string;
  button: InternalLinkItem;
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

export interface HomePageContent {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    image: ImageAsset;
    primaryCta: InternalLinkItem;
    secondaryCta: InternalLinkItem;
  };
  services: {
    eyebrow: string;
    title: string;
    text: string;
    cards: Tuple4<{
      icon: IconName;
      title: string;
      text: string;
      /** Optional: cards 3 and 4 have no link in the design. */
      link?: InternalLinkItem;
    }>;
  };
  about: {
    image: ImageAsset;
    badge: { label: string; text: string };
    eyebrow: string;
    title: string;
    paragraphs: Tuple2<string>;
    link: InternalLinkItem;
  };
  why: {
    eyebrow: string;
    title: string;
    items: Tuple4<{ title: string; text: string }>;
  };
  support: {
    eyebrow: string;
    title: string;
    cards: Tuple2<{ icon: IconName; title: string; text: string; link: InternalLinkItem }>;
  };
  cta: CtaBannerContent;
}
export interface AboutPageContent {
  meta: PageMeta;
  hero: PageHeroContent;
  perspective: SplitTitle & { label: string; text: string };
  stat: { image: ImageAsset; value: string; label: string };
  values: { label: string; items: Tuple3<{ title: string; text: string }> };
  capabilities: SplitTitle & {
    label: string;
    text: string;
    items: Tuple6<{ title: string; text: string }>;
  };
  quote: { image: ImageAsset; label: string; text: string; source: string };
}
/** Colour scheme of a services card (from content, so a CMS can reorder or restyle cards). */
export type ServiceCardTone = 'navy' | 'lavender' | 'red';

export interface ServicesPageContent {
  meta: PageMeta;
  hero: PageHeroContent;
  perspective: SplitTitle & { label: string; text: string };
  services: {
    /** Small label above each card title ("Consulting area"). */
    areaLabel: string;
    items: Tuple3<{ title: string; text: string; tone: ServiceCardTone }>;
    imageCard: { image: ImageAsset; text: string };
  };
  process: {
    label: string;
    title: string;
    text: string;
    steps: Tuple3<{ title: string; text: string }>;
  };
  next: { label: string; title: string; text: string; link: InternalLinkItem };
}
/** Colour of a support path card (from content). */
export type SupportCardTone = 'navy' | 'purple';

/** One support page. All support pages share one template; only the content differs. */
export interface SupportPageContent {
  meta: PageMeta;
  hero: PageHeroContent;
  paths: {
    label: string;
    title: string;
    text: string;
    cards: Tuple2<{ title: string; text: string; tone: SupportCardTone; link: InternalLinkItem }>;
  };
  how: {
    label: string;
    title: string;
    steps: Tuple3<{ title: string; text: string }>;
  };
  faq: {
    label: string;
    items: Tuple3<{ question: string; answer: string }>;
  };
}
export type ContactPageContent = PlaceholderPageContent;
export type BookingPageContent = PlaceholderPageContent;
export type PrivacyPolicyPageContent = PlaceholderPageContent;
export type CookiePolicyPageContent = PlaceholderPageContent;
export type NotFoundPageContent = PlaceholderPageContent;

/** All content for one locale. Every locale must match this shape exactly. */
export interface LocaleContent {
  site: SiteSettings;
  contactStrip: ContactStripContent;
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
export type PageKey = Exclude<ContentKey, 'site' | 'contactStrip' | 'supportPages'>;
