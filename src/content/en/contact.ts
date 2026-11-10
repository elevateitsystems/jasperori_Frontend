import type { ContactPageContent } from '@/types/content';

import { site } from './site';

const heroImage = {
  src: '/images/hero-glass-meeting-rooms.png',
  alt: 'Modern glass meeting rooms in a Scandinavian office',
  width: 1920,
  height: 720,
} satisfies ContactPageContent['hero']['image'];

export const contact: ContactPageContent = {
  meta: {
    title: 'Contact',
    description:
      "Contact TechSalem by email or book a consultation. Bring your challenge, opportunity or idea and we'll find a practical next step together.",
    image: heroImage,
  },
  hero: {
    eyebrow: 'Contact TechSalem',
    title: 'Let’s start with a clear conversation.',
    text: 'Tell us what you are working through, exploring, or planning. We will help identify a practical next step.',
    image: heroImage,
    primaryCta: { label: 'Start a conversation', href: '#lets-talk' },
  },
  talk: {
    label: '01 / Let’s talk',
    title: 'The right work starts with the right questions.',
    text: 'You do not need a finished brief. Bring the challenge, opportunity, or idea as it is today, and we will explore it together.',
    links: [
      { label: 'Email', link: site.footer.connect.links.infoEmail },
      { label: 'Calendar', link: { label: 'Book a consultation', href: '/booking' } },
    ],
  },
  direct: {
    image: {
      src: '/images/contact-glass-corridor.jpg',
      alt: 'Office corridor lined with black-framed glass walls',
      width: 1600,
      height: 1068,
    },
    label: '02 / Direct contact',
    title: 'What happens next?',
    text: 'We keep the first step simple, useful, and focused on your context.',
    facts: [
      { label: 'Location', value: 'Sweden' },
      { label: 'Response', value: 'One business day' },
    ],
  },
  steps: {
    label: '03 / What happens next',
    items: [
      'We review your enquiry',
      'We clarify the right next step',
      'We agree how to move forward',
    ],
  },
};
