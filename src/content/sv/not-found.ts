import type { NotFoundPageContent } from '@/types/content';

export const notFound: NotFoundPageContent = {
  meta: { title: 'Sidan hittades inte' },
  header: {
    eyebrow: 'Fel 404',
    title: 'Sidan hittades inte',
    text: 'Sidan du letar efter finns inte eller har flyttats.',
  },
  actions: {
    home: { label: 'Till startsidan', href: '/' },
    contact: { label: 'Kontakta oss', href: '/contact' },
  },
};
