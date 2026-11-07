import type { HomePageContent } from '@/types/content';

const heroImage = {
  src: '/images/home-hero-team-meeting.jpg',
  alt: 'Business team discussing a technology strategy around a laptop',
  width: 1024,
  height: 1280,
  // Phones/tablets: keep the seated woman and man in view.
  focalPoint: '68% 30%',
} satisfies HomePageContent['hero']['image'];

const serviceCardText =
  'A short description of this service area will appear here once the final service list is confirmed.';
const whyItemText = "A clear, collaborative approach with your organization's goals at the center.";
const supportCardText = 'Editable introduction to a dedicated support area.';

export const home: HomePageContent = {
  meta: {
    title: 'TechSalem | Technology & business consulting',
    absoluteTitle: true,
    description:
      'TechSalem is a technology and business consulting firm in Sweden. We help businesses navigate technology, optimize operations and find smarter solutions.',
    image: heroImage,
  },
  hero: {
    eyebrow: 'Technology & business consulting',
    title: 'Driving business forward through smarter technology.',
    text: 'We help businesses navigate technology, optimize operations, and discover smarter solutions that create meaningful business impact.',
    image: heroImage,
    primaryCta: { label: 'Explore our services', href: '/services' },
    secondaryCta: { label: 'Book a consultation', href: '/booking' },
  },
  services: {
    eyebrow: 'Services',
    title: 'How We Help Businesses Move Forward',
    text: 'Practical expertise and tailored solutions to help businesses overcome challenges and achieve their goals.',
    cards: [
      {
        icon: 'network',
        title: 'Service Area 01',
        text: serviceCardText,
        link: { label: 'Learn More', href: '/services' },
      },
      {
        icon: 'workflow',
        title: 'Service Area 02',
        text: serviceCardText,
        link: { label: 'Learn More', href: '/services' },
      },
      { icon: 'chart-column', title: 'Service Area 03', text: serviceCardText },
      { icon: 'shield-check', title: 'Service Area 04', text: serviceCardText },
    ],
  },
  about: {
    image: {
      src: '/images/home-about-presentation.jpg',
      alt: 'Consultant presenting a strategy on a screen to a colleague',
      width: 1200,
      height: 1024,
    },
    badge: { label: 'Our focus', text: 'Clear decisions. Meaningful impact.' },
    eyebrow: 'About TechSalem',
    title: 'Your Partner in Technology and Business Transformation.',
    paragraphs: [
      "TechSalem partners with companies to navigate technology, strengthen operations, and turn ideas into working solutions. Our approach is practical, business-first, and shaped around each client's unique situation.",
      'From the first conversation to a delivered result, we stay close to your goals and make every step of the journey clear and predictable.',
    ],
    link: { label: 'Discover TechSalem', href: '/about' },
  },
  why: {
    eyebrow: 'Why TechSalem',
    title: 'Built around your business, not a template.',
    items: [
      { title: 'Tailored business solutions', text: whyItemText },
      { title: 'Professional expertise', text: whyItemText },
      { title: 'Strategic thinking', text: whyItemText },
      { title: 'Reliable partnership', text: whyItemText },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'The right help, right when you need it.',
    cards: [
      {
        icon: 'headphones',
        title: 'Support area 01',
        text: supportCardText,
        link: { label: 'Explore support', href: '/support/support-01' },
      },
      {
        icon: 'headphones',
        title: 'Support area 02',
        text: supportCardText,
        link: { label: 'Explore support', href: '/support/support-02' },
      },
    ],
  },
  cta: {
    title: "Let's build what's next. Together.",
    text: "Have a business challenge or a new idea? Let's discuss how TechSalem can help you move forward.",
    button: { label: 'Book a consultation', href: '/booking' },
  },
};
