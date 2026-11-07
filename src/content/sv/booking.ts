import type { BookingPageContent } from '@/types/content';

const heroImage = {
  src: '/images/office-open-space.jpg',
  alt: 'Öppet kontor med ett långt mötesbord och stora fönster',
  width: 1600,
  height: 1068,
} satisfies BookingPageContent['hero']['image'];

export const booking: BookingPageContent = {
  meta: {
    title: 'Boka konsultation',
    description:
      'Boka en 45 minuter lång onlinekonsultation med TechSalem. Välj en tid som passar dig.',
    image: heroImage,
  },
  hero: {
    eyebrow: 'Konsultationsbokning',
    title: 'Skapa utrymme för ett bättre nästa steg.',
    text: 'Välj en tid för ett fokuserat samtal om din utmaning, möjlighet eller idé.',
    image: heroImage,
    primaryCta: { label: 'Starta ett samtal', href: '#choose-a-time' },
  },
  intro: {
    label: '01 / Välj en tid',
    title: 'Välj en tid som passar dig.',
    text: 'Ett första samtal är 45 minuter, sker online och fokuserar på att förstå ditt sammanhang och ett praktiskt nästa steg.',
    facts: [
      { label: 'Längd', value: '45 min' },
      { label: 'Format', value: 'Onlinemöte' },
      // Håll i synk med bookingConfig.timeZone (src/lib/booking/config.ts).
      { label: 'Tidszon', value: 'UTC' },
    ],
  },
  form: {
    slotsLabel: 'Lediga tider · UTC',
    loading: 'Laddar lediga tider …',
    fields: {
      name: 'Namn',
      email: 'E-post',
      company: 'Företag',
      message: 'Vad vill du prata om?',
    },
    honeypotLabel: 'Webbplats',
    submit: 'Bekräfta konsultation',
    sending: 'Skickar …',
    slotAria: '{weekday} {date} kl. {time}',
    slotUnavailable: 'Inte tillgänglig',
    chooseTimeHint: 'Välj en tid för att fortsätta.',
    errors: {
      slot: 'Välj en tid.',
      name: 'Ange ditt namn.',
      email: 'Ange en giltig e-postadress.',
      tooLong: 'Texten är för lång.',
      submit: 'Något gick fel. Försök igen eller mejla oss på {email}.',
    },
    success: {
      title: 'Tack – din konsultation är bokad.',
      text: 'Vi har skickat en bekräftelse till {email}. Vi ses {date} kl. {time}.',
      again: 'Boka en annan tid',
    },
    empty: 'Inga lediga tider just nu. Mejla oss gärna på {email}.',
    privacyNote: {
      before: 'Genom att boka godkänner du vår',
      link: { label: 'integritetspolicy', href: '/privacy-policy' },
      after: '.',
    },
  },
};
