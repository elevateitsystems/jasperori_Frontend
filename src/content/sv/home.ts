import type { HomePageContent } from '@/types/content';

const heroImage = {
  src: '/images/home-hero-team-meeting.jpg',
  alt: 'Affärsteam som diskuterar en teknikstrategi kring en laptop',
  width: 1024,
  height: 1280,
  // Phones/tablets: keep the seated woman and man in view.
  focalPoint: '68% 30%',
} satisfies HomePageContent['hero']['image'];

const serviceCardText =
  'En kort beskrivning av tjänsteområdet visas här när den slutliga tjänstelistan är fastställd.';
const whyItemText =
  'Ett tydligt och samarbetsinriktat arbetssätt med organisationens mål i centrum.';
const supportCardText = 'Redigerbar introduktion till ett dedikerat supportområde.';

export const home: HomePageContent = {
  meta: {
    title: 'TechSalem | Teknik- och verksamhetsrådgivning',
    absoluteTitle: true,
    description:
      'TechSalem är ett teknik- och verksamhetskonsultföretag i Sverige. Vi hjälper företag att navigera i tekniken, effektivisera verksamheten och hitta smartare lösningar.',
    image: heroImage,
  },
  hero: {
    eyebrow: 'Teknik- och verksamhetsrådgivning',
    title: 'Vi driver verksamheter framåt med smartare teknik.',
    text: 'Vi hjälper företag att navigera i tekniken, effektivisera verksamheten och hitta smartare lösningar som skapar verklig affärsnytta.',
    image: heroImage,
    primaryCta: { label: 'Utforska våra tjänster', href: '/services' },
    secondaryCta: { label: 'Boka konsultation', href: '/booking' },
  },
  services: {
    eyebrow: 'Tjänster',
    title: 'Så hjälper vi företag framåt',
    text: 'Praktisk expertis och skräddarsydda lösningar som hjälper företag att lösa utmaningar och nå sina mål.',
    cards: [
      {
        icon: 'network',
        title: 'Tjänsteområde 01',
        text: serviceCardText,
        link: { label: 'Läs mer', href: '/services' },
      },
      {
        icon: 'workflow',
        title: 'Tjänsteområde 02',
        text: serviceCardText,
        link: { label: 'Läs mer', href: '/services' },
      },
      { icon: 'chart-column', title: 'Tjänsteområde 03', text: serviceCardText },
      { icon: 'shield-check', title: 'Tjänsteområde 04', text: serviceCardText },
    ],
  },
  about: {
    image: {
      src: '/images/home-about-presentation.jpg',
      alt: 'Konsult som presenterar en strategi på en skärm för en kollega',
      width: 1200,
      height: 1024,
    },
    badge: { label: 'Vårt fokus', text: 'Tydliga beslut. Verklig effekt.' },
    eyebrow: 'Om TechSalem',
    title: 'Din partner för teknisk och affärsmässig förändring.',
    paragraphs: [
      'TechSalem samarbetar med företag för att navigera i tekniken, stärka verksamheten och omsätta idéer i fungerande lösningar. Vårt arbetssätt är praktiskt, utgår från affären och formas efter varje kunds unika situation.',
      'Från det första samtalet till ett levererat resultat håller vi oss nära dina mål och gör varje steg tydligt och förutsägbart.',
    ],
    link: { label: 'Upptäck TechSalem', href: '/about' },
  },
  why: {
    eyebrow: 'Varför TechSalem',
    title: 'Byggt kring din verksamhet, inte en mall.',
    items: [
      { title: 'Skräddarsydda affärslösningar', text: whyItemText },
      { title: 'Professionell expertis', text: whyItemText },
      { title: 'Strategiskt tänkande', text: whyItemText },
      { title: 'Pålitligt partnerskap', text: whyItemText },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'Rätt hjälp, precis när du behöver den.',
    cards: [
      {
        icon: 'headphones',
        title: 'Supportområde 01',
        text: supportCardText,
        link: { label: 'Utforska support', href: '/support/support-01' },
      },
      {
        icon: 'headphones',
        title: 'Supportområde 02',
        text: supportCardText,
        link: { label: 'Utforska support', href: '/support/support-02' },
      },
    ],
  },
  cta: {
    title: 'Låt oss bygga nästa steg. Tillsammans.',
    text: 'Har du en affärsutmaning eller en ny idé? Låt oss prata om hur TechSalem kan hjälpa dig framåt.',
    button: { label: 'Boka konsultation', href: '/booking' },
  },
};
