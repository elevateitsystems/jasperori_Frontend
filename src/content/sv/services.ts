import type { ServicesPageContent } from '@/types/content';

const heroImage = {
  src: '/images/hero-office-wide.png',
  alt: 'Kontorslandskap med människor som arbetar vid skrivbord',
  width: 1920,
  height: 720,
} satisfies ServicesPageContent['hero']['image'];

const processText = 'Varje uppdrag börjar med sammanhanget – inte med ett färdigt svar.';

export const services: ServicesPageContent = {
  meta: {
    title: 'Tjänster',
    description:
      'TechSalems konsulttjänster: praktisk teknik- och verksamhetsexpertis formad efter dina prioriteringar, från första fråga till tydliga nästa steg.',
    image: heroImage,
  },
  hero: {
    eyebrow: 'Konsulttjänster',
    title: 'Praktisk expertis för verkliga framsteg.',
    text: 'Ett fokuserat konsulterbjudande utformat efter dina prioriteringar. De slutliga tjänstenamnen kan uppdateras när erbjudandet är fastställt.',
    image: heroImage,
    primaryCta: { label: 'Starta ett samtal', href: '/contact' },
  },
  perspective: {
    label: '01 / Vårt perspektiv',
    title: 'En tjänstesida. En samlad bild.',
    titleAccent: 'Konsulttjänster.',
    text: 'Vi håller erbjudandet medvetet tydligt. Varje uppdrag formas utifrån affärsmålet, den nuvarande miljön och vad ditt team behöver för att komma vidare.',
  },
  services: {
    areaLabel: 'Konsultområde',
    items: [
      {
        title: 'Konsulttjänst 01',
        text: 'Redigerbar platshållare för ett strategiskt erbjudande inom teknik- eller verksamhetsrådgivning.',
        tone: 'navy',
      },
      {
        title: 'Konsulttjänst 02',
        text: 'Redigerbar platshållare för ett praktiskt erbjudande inom förändring eller effektivisering.',
        tone: 'lavender',
      },
      {
        title: 'Konsulttjänst 03',
        text: 'Redigerbar platshållare för ytterligare en fokuserad, resultatinriktad konsulttjänst.',
        tone: 'red',
      },
    ],
    imageCard: {
      image: {
        src: '/images/services-card-office.jpg',
        alt: 'Ljust kontor med arbetsplatser och en loungedel',
        width: 1600,
        height: 1200,
      },
      text: 'Expertis formad efter sammanhanget.',
    },
  },
  process: {
    label: '02 / Från behov till resultat',
    title: 'Från fråga till tydlig riktning.',
    text: processText,
    steps: [
      { title: 'Upptäck det verkliga affärsbehovet', text: processText },
      { title: 'Forma ett fokuserat uppdrag', text: processText },
      { title: 'Leverera praktiska nästa steg', text: processText },
    ],
  },
  next: {
    label: '03 / Nästa steg',
    title: 'Rätt uppdrag börjar med rätt fråga.',
    text: 'Berätta vad du behöver förändra, förbättra eller förstå. Vi hjälper dig att forma nästa steg.',
    link: { label: 'Starta ett samtal', href: '/contact' },
  },
};
