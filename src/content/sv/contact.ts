import type { ContactPageContent } from '@/types/content';

import { site } from './site';

const heroImage = {
  src: '/images/hero-glass-meeting-rooms.png',
  alt: 'Moderna mötesrum i glas på ett skandinaviskt kontor',
  width: 1920,
  height: 720,
} satisfies ContactPageContent['hero']['image'];

export const contact: ContactPageContent = {
  meta: {
    title: 'Kontakt',
    description:
      'Kontakta TechSalem via e-post eller boka en konsultation. Kom med din utmaning, möjlighet eller idé så hittar vi ett praktiskt nästa steg tillsammans.',
    image: heroImage,
  },
  hero: {
    eyebrow: 'Kontakta TechSalem',
    title: 'Låt oss börja med ett tydligt samtal.',
    text: 'Berätta vad du arbetar med, utforskar eller planerar. Vi hjälper dig att hitta ett praktiskt nästa steg.',
    image: heroImage,
    primaryCta: { label: 'Starta ett samtal', href: '#lets-talk' },
  },
  talk: {
    label: '01 / Låt oss prata',
    title: 'Rätt arbete börjar med rätt frågor.',
    text: 'Du behöver ingen färdig brief. Kom med utmaningen, möjligheten eller idén som den ser ut i dag, så utforskar vi den tillsammans.',
    links: [
      { label: 'E-post', link: site.footer.connect.links.infoEmail },
      { label: 'Kalender', link: { label: 'Boka konsultation', href: '/booking' } },
    ],
  },
  direct: {
    image: {
      src: '/images/contact-glass-corridor.jpg',
      alt: 'Kontorskorridor med glasväggar i svarta ramar',
      width: 1600,
      height: 1068,
    },
    label: '02 / Direkt kontakt',
    title: 'Vad händer sedan?',
    text: 'Vi håller det första steget enkelt, användbart och fokuserat på ditt sammanhang.',
    facts: [
      { label: 'Plats', value: 'Sverige' },
      { label: 'Svarstid', value: 'En arbetsdag' },
    ],
  },
  steps: {
    label: '03 / Vad som händer sedan',
    items: [
      'Vi går igenom din förfrågan',
      'Vi tydliggör rätt nästa steg',
      'Vi kommer överens om hur vi går vidare',
    ],
  },
};
