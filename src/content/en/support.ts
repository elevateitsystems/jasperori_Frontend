import type { SupportPageContent, SupportSlug } from '@/types/content';

const pathText1 = 'Editable support category for a defined customer need, platform, or service.';
const pathText2 = 'Editable support category providing a second clear path for customers.';
const stepText = 'A simple support journey keeps attention on the issue—not the process.';

/** support-01: the design copy. */
const support01: SupportPageContent = {
  meta: {
    title: 'Support',
    description:
      'Get reliable support from TechSalem. Two focused support paths help you find the right route quickly.',
  },
  hero: {
    eyebrow: 'Business support',
    title: 'Reliable support without unnecessary friction.',
    text: 'Two focused support paths help you find the right route quickly. Final support scope and service levels remain editable.',
    image: {
      src: '/images/hero-office-wide.png',
      alt: 'Open-plan office with people working at desks',
      width: 1920,
      height: 720,
    },
    primaryCta: { label: 'Start a conversation', href: '/contact' },
  },
  paths: {
    label: '01 / Choose your path',
    title: 'Support designed around continuity.',
    text: 'When something needs attention, the experience should be clear and direct. Our support structure prioritizes context, ownership, and practical communication.',
    cards: [
      {
        title: 'Support area 01',
        text: pathText1,
        tone: 'navy',
        link: { label: 'Start support request', href: '/contact' },
      },
      {
        title: 'Support area 02',
        text: pathText2,
        tone: 'purple',
        link: { label: 'Start support request', href: '/contact' },
      },
    ],
  },
  how: {
    label: '02 / How it works',
    title: 'Clear from the first contact.',
    steps: [
      { title: 'Choose the relevant support area', text: stepText },
      { title: 'Share the context and priority', text: stepText },
      { title: 'Receive a clear next step', text: stepText },
    ],
  },
  faq: {
    label: 'Frequently asked questions',
    items: [
      { question: 'Which support path should I choose?', answer: pathText1 },
      { question: 'What should I include in my request?', answer: pathText2 },
      {
        question: 'How do I follow my request?',
        answer: 'Not sure where to start? Contact us and we will help direct your request.',
      },
    ],
  },
};

/** support-02: support-01 with only its own hero copy and metadata. */
const support02: SupportPageContent = {
  ...support01,
  meta: {
    ...support01.meta,
    title: 'Support page 02',
    description: 'TechSalem support page 02: a second focused support path with clear next steps.',
  },
  hero: {
    ...support01.hero,
    title: 'Clear help for every support need.',
    text: 'A second focused support path. Final support scope and service levels remain editable.',
  },
};

export const supportPages: Record<SupportSlug, SupportPageContent> = {
  'support-01': support01,
  'support-02': support02,
};
