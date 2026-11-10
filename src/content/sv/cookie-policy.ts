/*
 * UTKAST – måste granskas och godkännas av kunden före lansering.
 * Bygger på en genomgång av produktionsbygget (7 nov 2026): den enda cookien är NEXT_LOCALE
 * (sätts av språkhanteringen, next-intl); ingen localStorage/sessionStorage; inga anrop till
 * tredje part (typsnitten ligger på egen server). Uppdatera sidan om det ändras.
 */
import type { CookiePolicyPageContent } from '@/types/content';

import { site } from './site';

const email = site.footer.connect.links.infoEmail;

export const cookiePolicy: CookiePolicyPageContent = {
  meta: {
    title: 'Cookiepolicy',
    description:
      'Vilka cookies TechSalems webbplats använder: en nödvändig språkcookie och inga cookies för statistik eller marknadsföring.',
  },
  header: {
    eyebrow: 'Juridiskt',
    title: 'Cookiepolicy',
    text: 'Senast uppdaterad: 7 november 2026',
  },
  contentsLabel: 'Innehåll',
  sections: [
    {
      id: 'what-are-cookies',
      heading: 'Vad cookies är',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cookies är små textfiler som en webbplats sparar i din webbläsare. En del behövs för att webbplatsen ska fungera, andra används till exempel för statistik eller annonsering.',
        },
      ],
    },
    {
      id: 'cookies-we-use',
      heading: 'Cookies vi använder',
      blocks: [
        {
          type: 'paragraph',
          text: 'Webbplatsen använder en enda cookie, och den är nödvändig:',
        },
        {
          type: 'table',
          caption: 'Cookies på webbplatsen',
          columns: ['Namn', 'Syfte', 'Typ', 'Lagringstid'],
          rows: [
            [
              'NEXT_LOCALE',
              'Kommer ihåg webbplatsens språk (svenska eller engelska), så att du ser det språk du har valt.',
              'Nödvändig',
              'Tills du stänger webbläsaren',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Webbplatsen sparar inget annat i din webbläsare och hämtar inget innehåll från andra företag. Våra typsnitt ligger på vår egen server.',
        },
      ],
    },
    {
      id: 'no-tracking',
      heading: 'Inga cookies för statistik eller marknadsföring',
      blocks: [
        {
          type: 'paragraph',
          text: 'Vi använder i dag inga cookies för statistik, annonsering eller sociala medier. Eftersom den enda cookien är nödvändig behöver vi inte be om ditt samtycke, och därför finns ingen cookiebanner.',
        },
        {
          type: 'paragraph',
          text: 'Om vi i framtiden lägger till statistik eller andra cookies som inte är nödvändiga ber vi först om ditt samtycke via en cookiebanner och uppdaterar den här policyn.',
        },
      ],
    },
    {
      id: 'manage-cookies',
      heading: 'Så tar du bort eller blockerar cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'Du kan radera cookies och blockera nya i webbläsarens inställningar, oftast under sekretess eller säkerhet. Om du blockerar språkcookien fungerar webbplatsen ändå, men den kanske inte kommer ihåg ditt språkval.',
        },
      ],
    },
    {
      id: 'contact',
      heading: 'Kontakt',
      blocks: [
        {
          type: 'paragraph',
          text: [
            'Har du frågor om cookies eller vår ',
            { label: 'integritetspolicy', href: '/privacy-policy' },
            '? Mejla oss på ',
            email,
            '.',
          ],
        },
      ],
    },
  ],
};
