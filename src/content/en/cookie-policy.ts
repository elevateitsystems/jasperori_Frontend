/*
 * DRAFT – must be reviewed and approved by the client before launch.
 * Based on an audit of the production build (7 Nov 2026): the only cookie is NEXT_LOCALE
 * (set by the language routing, next-intl); no localStorage/sessionStorage; no third-party
 * requests (fonts are self-hosted). Update this page whenever that changes.
 */
import type { CookiePolicyPageContent } from '@/types/content';

import { site } from './site';

const email = site.footer.connect.links.infoEmail;

export const cookiePolicy: CookiePolicyPageContent = {
  meta: {
    title: 'Cookie policy',
    description:
      'Which cookies the TechSalem website uses: one strictly necessary language cookie, and no analytics or marketing cookies.',
  },
  header: {
    eyebrow: 'Legal',
    title: 'Cookie policy',
    text: 'Last updated: 7 November 2026',
  },
  contentsLabel: 'Contents',
  sections: [
    {
      id: 'what-are-cookies',
      heading: 'What cookies are',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cookies are small text files that a website stores in your browser. Some are needed for the site to work; others are used for things like statistics or advertising.',
        },
      ],
    },
    {
      id: 'cookies-we-use',
      heading: 'Cookies we use',
      blocks: [
        {
          type: 'paragraph',
          text: 'This website uses one cookie, and it is strictly necessary:',
        },
        {
          type: 'table',
          caption: 'Cookies used on this website',
          columns: ['Name', 'Purpose', 'Type', 'Duration'],
          rows: [
            [
              'NEXT_LOCALE',
              'Remembers the language of the website (Swedish or English), so you see the language you chose.',
              'Strictly necessary',
              'Until you close your browser',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'The website does not store anything else in your browser and does not load content from other companies. Our fonts are hosted on our own server.',
        },
      ],
    },
    {
      id: 'no-tracking',
      heading: 'No analytics or marketing cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'We currently use no analytics, advertising or social media cookies. Because the only cookie is strictly necessary, we do not need to ask for your consent and there is no cookie banner.',
        },
        {
          type: 'paragraph',
          text: 'If we add analytics or other non-essential cookies in the future, we will first ask for your consent with a cookie banner and update this policy.',
        },
      ],
    },
    {
      id: 'manage-cookies',
      heading: 'How to delete or block cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'You can delete cookies and block new ones in your browser settings, usually under privacy or security. If you block the language cookie, the website still works, but it may not remember your language choice.',
        },
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      blocks: [
        {
          type: 'paragraph',
          text: [
            'Questions about cookies or our ',
            { label: 'privacy policy', href: '/privacy-policy' },
            '? Email us at ',
            email,
            '.',
          ],
        },
      ],
    },
  ],
};
