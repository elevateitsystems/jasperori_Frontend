import type { ContactStripContent } from '@/types/content';

import { site } from './site';

/** "04 / Kontakt" strip (Om oss, Tjänster). E-post och LinkedIn kommer från webbplatsinställningarna. */
export const contactStrip: ContactStripContent = {
  label: '04 / Kontakt',
  title: 'Vad kan vi',
  titleAccent: 'förenkla för dig?',
  rows: [
    { label: 'E-post', link: site.footer.connect.links.email },
    { label: 'Konsultation', link: { label: 'Välj en tid', href: '/booking' } },
    { label: 'LinkedIn', link: { ...site.footer.connect.links.linkedin, label: 'TechSalem' } },
  ],
};
