import type { SupportPageContent, SupportSlug } from '@/types/content';

const support01: SupportPageContent = {
  meta: {
    title: 'IT support for home and business',
    description:
      'See TechSalem’s IT support services, coverage, and starting prices for homes and small businesses.',
  },
  hero: {
    eyebrow: 'TechSalem IT support',
    title: 'Services for home and business.',
    text: "Choose a service below, or get in touch if you cannot find what you are looking for. We solve most things related to computers and networks.",
    image: {
      src: '/images/hero-office-wide.png',
      alt: 'People working with computers in a bright office',
      width: 1920,
      height: 720,
    },
  },
  services: {
    label: 'IT support services',
    title: 'Find the right help',
    text: 'Clear service areas and starting prices. Book an appointment and we will help you take the next step.',
    items: [
      {
        title: 'Computer help at home',
        text: 'Slow computer, viruses, installations or general troubleshooting — we come to your home or help by remote access.',
        price: 'From 495 SEK',
        link: { label: 'Book a consultation', href: '/booking' },
      },
      {
        title: 'Network & Wi-Fi',
        text: 'Poor coverage, dropped connection or a new home? We build a network that actually lasts.',
        price: 'From 695 SEK',
        link: { label: 'Book a consultation', href: '/booking' },
      },
      {
        title: 'Viruses & security',
        text: 'Protection against viruses, fraud and intrusions. We clean up and set up security that lasts over time.',
        price: 'From 895 SEK',
        link: { label: 'Book a consultation', href: '/booking' },
      },
      {
        title: 'Data recovery & backup',
        text: 'Lost files or a broken hard drive? We save what we can and set up automatic backup going forward.',
        price: 'Quote after assessment',
        link: { label: 'Book a consultation', href: '/booking' },
      },
      {
        title: 'Business support',
        text: 'Ongoing IT operations for small businesses — we keep track so you can focus on your business.',
        price: 'From 1,495 SEK/month',
        link: { label: 'Book a consultation', href: '/booking' },
      },
      {
        title: 'Printers & peripherals',
        text: 'Installation and troubleshooting of printers, scanners and other equipment in the home or office.',
        price: 'From 395 SEK',
        link: { label: 'Book a consultation', href: '/booking' },
      },
    ],
  },
  cta: {
    title: 'Ready to get it sorted?',
    text: "Book an appointment today — we will get back to you within 24 hours with a fixed price.",
    button: { label: 'Book an appointment', href: '/booking' },
  },
};

const support02: SupportPageContent = {
  ...support01,
  meta: {
    ...support01.meta,
    title: 'IT support services',
    description: 'Explore TechSalem’s IT support services and starting prices.',
  },
};

export const supportPages: Record<SupportSlug, SupportPageContent> = {
  'support-01': support01,
  'support-02': support02,
};
