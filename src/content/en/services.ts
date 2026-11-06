import type { ServicesPageContent } from '@/types/content';

const heroImage = {
  src: '/images/hero-office-wide.png',
  alt: 'Open-plan office with people working at desks',
  width: 1920,
  height: 720,
} satisfies ServicesPageContent['hero']['image'];

const processText = 'Every engagement starts with context—not a predetermined answer.';

export const services: ServicesPageContent = {
  meta: {
    title: 'Services',
    description:
      "TechSalem's consulting services: practical technology and business expertise shaped around your priorities, from first question to clear next steps.",
    image: heroImage,
  },
  hero: {
    eyebrow: 'Consulting services',
    title: 'Practical expertise for meaningful progress.',
    text: 'A focused consulting portfolio designed around your priorities. Final service names can be updated when the offering is confirmed.',
    image: heroImage,
    primaryCta: { label: 'Start a conversation', href: '/contact' },
  },
  perspective: {
    label: '01 / Our perspective',
    title: 'One services page. One connected view.',
    titleAccent: 'Consulting services.',
    text: 'We keep the offering intentionally clear. Each engagement is shaped around the business outcome, the current environment, and what your team needs to move forward.',
  },
  services: {
    areaLabel: 'Consulting area',
    items: [
      {
        title: 'Consulting service 01',
        text: 'Editable placeholder for a strategic technology or business consulting offer.',
        tone: 'navy',
      },
      {
        title: 'Consulting service 02',
        text: 'Editable placeholder for a practical transformation or optimization offer.',
        tone: 'lavender',
      },
      {
        title: 'Consulting service 03',
        text: 'Editable placeholder for another focused, outcome-led consulting service.',
        tone: 'red',
      },
    ],
    imageCard: {
      image: {
        src: '/images/services-card-office.jpg',
        alt: 'Bright office with workstations and a lounge area',
        width: 1600,
        height: 1200,
      },
      text: 'Expertise shaped around the context.',
    },
  },
  process: {
    label: '02 / From need to outcome',
    title: 'From question to clear direction.',
    text: processText,
    steps: [
      { title: 'Discover the real business need', text: processText },
      { title: 'Shape a focused engagement', text: processText },
      { title: 'Deliver practical next steps', text: processText },
    ],
  },
  next: {
    label: '03 / Next step',
    title: 'The right engagement starts with the right question.',
    text: 'Tell us what you need to change, improve, or understand. We will help shape the next step.',
    link: { label: 'Start a conversation', href: '/contact' },
  },
};
