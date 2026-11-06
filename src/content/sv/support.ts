import type { SupportPageContent, SupportSlug } from '@/types/content';

const pathText1 =
  'Redigerbar supportkategori för ett definierat kundbehov, en plattform eller en tjänst.';
const pathText2 = 'Redigerbar supportkategori som ger kunderna en andra tydlig väg.';
const stepText = 'En enkel supportresa håller fokus på frågan – inte på processen.';

/** support-01: designens text. */
const support01: SupportPageContent = {
  meta: {
    title: 'Support',
    description:
      'Få pålitlig support från TechSalem. Två fokuserade supportvägar hjälper dig att snabbt hitta rätt.',
  },
  hero: {
    eyebrow: 'Verksamhetssupport',
    title: 'Pålitlig support utan onödigt krångel.',
    text: 'Två fokuserade supportvägar hjälper dig att snabbt hitta rätt. Slutlig supportomfattning och servicenivåer kan fortfarande redigeras.',
    image: {
      src: '/images/hero-office-wide.png',
      alt: 'Kontorslandskap med människor som arbetar vid skrivbord',
      width: 1920,
      height: 720,
    },
    primaryCta: { label: 'Starta ett samtal', href: '/contact' },
  },
  paths: {
    label: '01 / Välj din väg',
    title: 'Support byggd för kontinuitet.',
    text: 'När något behöver åtgärdas ska upplevelsen vara tydlig och direkt. Vår supportstruktur prioriterar sammanhang, ansvar och praktisk kommunikation.',
    cards: [
      {
        title: 'Supportområde 01',
        text: pathText1,
        tone: 'navy',
        link: { label: 'Skicka supportärende', href: '/contact' },
      },
      {
        title: 'Supportområde 02',
        text: pathText2,
        tone: 'purple',
        link: { label: 'Skicka supportärende', href: '/contact' },
      },
    ],
  },
  how: {
    label: '02 / Så fungerar det',
    title: 'Tydligt från första kontakten.',
    steps: [
      { title: 'Välj rätt supportområde', text: stepText },
      { title: 'Beskriv sammanhang och prioritet', text: stepText },
      { title: 'Få ett tydligt nästa steg', text: stepText },
    ],
  },
  faq: {
    label: 'Vanliga frågor',
    items: [
      { question: 'Vilken supportväg ska jag välja?', answer: pathText1 },
      { question: 'Vad ska jag ta med i mitt ärende?', answer: pathText2 },
      {
        question: 'Hur följer jag mitt ärende?',
        answer:
          'Osäker på var du ska börja? Kontakta oss så hjälper vi dig att rikta ditt ärende rätt.',
      },
    ],
  },
};

/** support-02: support-01 med endast egen hero-text och metadata. */
const support02: SupportPageContent = {
  ...support01,
  meta: {
    ...support01.meta,
    title: 'Supportsida 02',
    description:
      'TechSalems supportsida 02: en andra, fokuserad supportväg med tydliga nästa steg.',
  },
  hero: {
    ...support01.hero,
    title: 'Tydlig hjälp för varje supportbehov.',
    text: 'En andra, fokuserad supportväg. Slutlig supportomfattning och servicenivåer kan fortfarande redigeras.',
  },
};

export const supportPages: Record<SupportSlug, SupportPageContent> = {
  'support-01': support01,
  'support-02': support02,
};
