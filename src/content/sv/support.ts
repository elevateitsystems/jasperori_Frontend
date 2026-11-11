import type { SupportPageContent, SupportSlug } from '@/types/content';

const support01: SupportPageContent = {
  meta: {
    title: 'IT-support för hem och företag',
    description:
      'Se TechSalems IT-supporttjänster, vad de omfattar och frånpriser för hem och småföretag.',
  },
  hero: {
    eyebrow: 'TechSalem IT-support',
    title: 'Tjänster för hem och företag.',
    text: 'Välj en tjänst nedan eller kontakta oss om du inte hittar det du söker. Vi löser det mesta som rör datorer och nätverk.',
    image: {
      src: '/images/hero-office-wide.png',
      alt: 'Människor som arbetar med datorer på ett ljust kontor',
      width: 1920,
      height: 720,
    },
  },
  services: {
    label: 'IT-supporttjänster',
    title: 'Hitta rätt hjälp',
    text: 'Tydliga serviceområden och frånpriser. Boka en tid så hjälper vi dig vidare.',
    items: [
      {
        title: 'Datorhjälp i hemmet',
        text: 'Långsam dator, virus, installationer eller allmän felsökning — vi kommer hem till dig eller hjälper dig på distans.',
        price: 'Från 495 SEK',
        link: { label: 'Boka konsultation', href: '/booking' },
      },
      {
        title: 'Nätverk & Wi-Fi',
        text: 'Dålig täckning, avbrott eller ett nytt hem? Vi bygger ett nätverk som håller över tid.',
        price: 'Från 695 SEK',
        link: { label: 'Boka konsultation', href: '/booking' },
      },
      {
        title: 'Virus & säkerhet',
        text: 'Skydd mot virus, bedrägerier och intrång. Vi rensar upp och sätter upp ett skydd som håller över tid.',
        price: 'Från 895 SEK',
        link: { label: 'Boka konsultation', href: '/booking' },
      },
      {
        title: 'Dataåterställning & backup',
        text: 'Förlorade filer eller en trasig hårddisk? Vi räddar det vi kan och hjälper dig att ordna automatisk säkerhetskopiering.',
        price: 'Offert efter bedömning',
        link: { label: 'Boka konsultation', href: '/booking' },
      },
      {
        title: 'IT-support för företag',
        text: 'Löpande IT-drift för småföretag — vi håller koll så att du kan fokusera på verksamheten.',
        price: 'Från 1 495 SEK/månad',
        link: { label: 'Boka konsultation', href: '/booking' },
      },
      {
        title: 'Skrivare & tillbehör',
        text: 'Installation och felsökning av skrivare, skannrar och annan utrustning i hemmet eller på kontoret.',
        price: 'Från 395 SEK',
        link: { label: 'Boka konsultation', href: '/booking' },
      },
      {
        title: 'Webbutveckling',
        text: 'Vi bygger skräddarsydda webbplatser av alla slag, från enkla webbplatser till komplexa, avancerade webbapplikationer. Boka en konsultation eller kontakta oss direkt för att anlita oss för ditt projekt.',
        price: 'Pris enligt offert',
        link: { label: 'Boka konsultation', href: '/booking' },
      },
    ],
  },
  cta: {
    title: 'Redo att få det löst?',
    text: 'Boka en tid idag — vi återkommer inom 24 timmar med ett fast pris.',
    button: { label: 'Boka en tid', href: '/booking' },
  },
};

const support02: SupportPageContent = {
  ...support01,
  meta: {
    ...support01.meta,
    title: 'IT-supporttjänster',
    description: 'Utforska TechSalems IT-supporttjänster och frånpriser.',
  },
};

export const supportPages: Record<SupportSlug, SupportPageContent> = {
  'support-01': support01,
  'support-02': support02,
};
