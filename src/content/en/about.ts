import type { AboutPageContent } from '@/types/content';

const officeImage = {
  src: '/images/office-open-space.jpg',
  alt: 'Open office space with a long meeting table and large windows',
  width: 1600,
  height: 1068,
} satisfies AboutPageContent['hero']['image'];

const values = [
  {
    title: 'Clarity first',
    text: 'We create a shared view of the challenge before defining the solution.',
  },
  {
    title: 'Business aligned',
    text: 'Technology decisions are connected to goals, people, and operational reality.',
  },
  {
    title: 'Built together',
    text: 'Close collaboration creates stronger decisions and solutions that last.',
  },
] satisfies AboutPageContent['values']['items'];

const capabilitiesText =
  'No unnecessary layers. No one-size-fits-all playbook. Just thoughtful expertise applied where it matters.';

export const about: AboutPageContent = {
  meta: {
    title: 'About',
    description:
      'Learn about TechSalem, a technology and business consulting partner in Sweden that connects strategic intent with practical progress.',
    image: officeImage,
  },
  hero: {
    eyebrow: 'Technology & business consulting',
    title: 'Technology thinking, grounded in business.',
    text: 'TechSalem is a technology and business consulting partner for organizations seeking a clearer path through change.',
    image: officeImage,
    primaryCta: { label: 'Start a conversation', href: '/contact' },
    secondaryCta: { label: 'Book a consultation', href: '/booking' },
  },
  perspective: {
    label: '01 / Our perspective',
    title: 'We make complexity easier to act on.',
    titleAccent: 'About TechSalem.',
    text: 'Our role is to connect strategic intent with practical progress. We listen carefully, frame the right questions, and shape solutions around the realities of your organization.',
  },
  stat: {
    image: {
      src: '/images/about-quote-office.jpg',
      alt: 'Team working at desks in a bright, modern office',
      width: 1800,
      height: 1350,
    },
    value: '100%',
    label: 'Focused on your reality',
  },
  values: {
    label: '02 / What we value',
    items: values,
  },
  capabilities: {
    label: '03 / Our capabilities',
    title: 'A focused, human approach.',
    titleAccent: 'Every day.',
    text: capabilitiesText,
    items: [
      ...values,
      { title: 'Understand the business context', text: capabilitiesText },
      { title: 'Define the opportunity clearly', text: capabilitiesText },
      { title: 'Move from direction to action', text: capabilitiesText },
    ],
  },
  quote: {
    image: officeImage,
    label: 'What we believe',
    text: '“No unnecessary layers. No one-size-fits-all playbook. Just thoughtful expertise applied where it matters.”',
    source: 'TechSalem / Sweden',
  },
};
