import type { SiteSettings } from '@/types/content';

const navigation = {
  home: { label: 'Home', href: '/' },
  about: { label: 'About', href: '/about' },
  services: { label: 'Services', href: '/services' },
  support: { label: 'Support', href: '/support' },
  contact: { label: 'Contact', href: '/contact' },
} satisfies SiteSettings['navigation'];

export const site: SiteSettings = {
  siteName: 'TechSalem',
  navigation,
  header: {
    cta: { label: 'Book a consultation', href: '/booking' },
  },
  footer: {
    tagline:
      'Technology and business consulting for organizations ready to move with clarity and confidence.',
    quickLinks: {
      heading: 'Quick links',
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
        supportPage1: { label: 'Support page 01', href: '/support' },
        supportPage2: { label: 'Support page 02', href: '/support' },
        privacy: { label: 'Privacy policy', href: '/privacy-policy' },
        cookies: { label: 'Cookie policy', href: '/cookie-policy' },
      },
    },
    connect: {
      heading: 'Connect',
      links: {
        // TODO: replace '#' with the real LinkedIn and Facebook URLs when the client provides them.
        linkedin: { label: 'LinkedIn', href: '#' },
        facebook: { label: 'Facebook', href: '#' },
        email: { label: 'hello@techsalem.se', href: 'mailto:hello@techsalem.se' },
      },
    },
    copyright: '© 2026 TechSalem. All rights reserved.',
    slogan: 'Technology with purpose.',
  },
};
