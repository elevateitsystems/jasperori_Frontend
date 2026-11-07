import type { NotFoundPageContent } from '@/types/content';

export const notFound: NotFoundPageContent = {
  meta: { title: 'Page not found' },
  header: {
    eyebrow: 'Error 404',
    title: 'Page not found',
    text: 'The page you’re looking for doesn’t exist or has moved.',
  },
  actions: {
    home: { label: 'Go to the home page', href: '/' },
    contact: { label: 'Contact us', href: '/contact' },
  },
};
