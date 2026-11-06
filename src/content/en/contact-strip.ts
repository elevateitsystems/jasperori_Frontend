import type { ContactStripContent } from '@/types/content';

import { site } from './site';

/** "04 / Contact" strip (About, Services). Email and LinkedIn come from the site settings. */
export const contactStrip: ContactStripContent = {
  label: '04 / Contact',
  title: 'What can we',
  titleAccent: 'simplify for you?',
  rows: [
    { label: 'Email', link: site.footer.connect.links.email },
    { label: 'Consultation', link: { label: 'Choose a time', href: '/booking' } },
    { label: 'LinkedIn', link: { ...site.footer.connect.links.linkedin, label: 'TechSalem' } },
  ],
};
