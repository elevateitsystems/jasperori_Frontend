import type { SiteSettings } from '@/types/content';

const navigation = {
  home: { label: 'Hem', href: '/' },
  about: { label: 'Om oss', href: '/about' },
  services: { label: 'Tjänster', href: '/services' },
  support: { label: 'Support', href: '/support' },
  contact: { label: 'Kontakt', href: '/contact' },
} satisfies SiteSettings['navigation'];

export const site: SiteSettings = {
  siteName: 'TechSalem',
  navigation,
  header: {
    cta: { label: 'Boka konsultation', href: '/booking' },
  },
  footer: {
    tagline:
      'Teknik- och verksamhetsrådgivning för organisationer som vill gå framåt med tydlighet och självförtroende.',
    quickLinks: {
      heading: 'Snabblänkar',
      links: {
        home: navigation.home,
        about: navigation.about,
        services: navigation.services,
        support: navigation.support,
      },
    },
    support: {
      heading: 'Support',
      links: {
        // TODO: point each link at its own support page once the Support routes are built.
        supportPage1: { label: 'Supportsida 01', href: '/support' },
        supportPage2: { label: 'Supportsida 02', href: '/support' },
        privacy: { label: 'Integritetspolicy', href: '/privacy-policy' },
        cookies: { label: 'Cookiepolicy', href: '/cookie-policy' },
      },
    },
    connect: {
      heading: 'Följ oss',
      links: {
        // TODO: replace '#' with the real LinkedIn and Facebook URLs when the client provides them.
        linkedin: { label: 'LinkedIn', href: '#' },
        facebook: { label: 'Facebook', href: '#' },
        email: { label: 'hello@techsalem.se', href: 'mailto:hello@techsalem.se' },
      },
    },
    copyright: '© 2026 TechSalem. Alla rättigheter förbehållna.',
    slogan: 'Teknik med syfte.',
  },
};
