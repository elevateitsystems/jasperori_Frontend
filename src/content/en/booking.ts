import type { BookingPageContent } from '@/types/content';

const heroImage = {
  src: '/images/office-open-space.jpg',
  alt: 'Open office space with a long meeting table and large windows',
  width: 1600,
  height: 1068,
} satisfies BookingPageContent['hero']['image'];

export const booking: BookingPageContent = {
  meta: {
    title: 'Book a consultation',
    description:
      'Book a 45-minute online consultation with TechSalem. Choose a time that works for you.',
    image: heroImage,
  },
  hero: {
    eyebrow: 'Consultation booking',
    title: 'Make space for a better next step.',
    text: 'Choose a time for a focused conversation about your challenge, opportunity, or idea.',
    image: heroImage,
    primaryCta: { label: 'Start a conversation', href: '#choose-a-time' },
  },
  intro: {
    label: '01 / Choose a time',
    title: 'Choose a time that works for you.',
    text: 'A first conversation is 45 minutes, online, and focused on understanding your context and practical next step.',
    facts: [
      { label: 'Duration', value: '45 min' },
      { label: 'Format', value: 'Online meeting' },
      // Keep in sync with bookingConfig.timeZone (src/lib/booking/config.ts).
      { label: 'Time zone', value: 'UTC' },
    ],
  },
  form: {
    slotsLabel: 'Available times · UTC',
    loading: 'Loading available times…',
    fields: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      message: 'What would you like to discuss?',
    },
    honeypotLabel: 'Website',
    submit: 'Confirm consultation',
    sending: 'Sending…',
    slotAria: '{weekday} {date} at {time}',
    slotUnavailable: 'Not available',
    chooseTimeHint: 'Choose a time to continue.',
    errors: {
      slot: 'Please choose a time.',
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      tooLong: 'This text is too long.',
      submit: 'Something went wrong. Please try again or email us at {email}.',
    },
    success: {
      title: 'Thank you – your consultation is booked.',
      text: 'We have sent a confirmation to {email}. See you on {date} at {time}.',
      again: 'Book another time',
    },
    empty: 'No available times right now. Please email us at {email}.',
    privacyNote: {
      before: 'By booking, you agree to our',
      link: { label: 'privacy policy', href: '/privacy-policy' },
      after: '.',
    },
  },
};
