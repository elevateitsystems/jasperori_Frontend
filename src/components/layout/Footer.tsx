import { getLocale, getTranslations } from 'next-intl/server';

import { ContentLink } from '@/components/ui/ContentLink';
import { Logo } from '@/components/ui/Logo';
import { getContent } from '@/content';

/**
 * Site footer (spec: home.md, "Frame 2147240631"). Navy-dark, 80px top / 40px bottom padding,
 * 1136px content (200px + 32px side padding at 1600px). A 4-column grid with a 1px white/10
 * line under it, then the copyright bar. Total height at 1600px: 377px, as in the frame.
 */
export async function Footer() {
  const locale = await getLocale();
  const [site, t] = await Promise.all([getContent(locale, 'site'), getTranslations('a11y')]);
  const { footer } = site;

  const columns = [
    { id: 'footer-quick-links', ...footer.quickLinks },
    { id: 'footer-support', ...footer.support },
    { id: 'footer-connect', ...footer.connect },
  ];

  return (
    <footer data-menu-inert className="bg-navy-dark pt-20 pb-10 [--focus-ring:var(--color-white)]">
      <div className="site-container">
        <div className="mx-auto max-w-inner">
          <div className="grid gap-x-12 gap-y-10 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo
                name={site.siteName}
                label={t('homeLink', { siteName: site.siteName })}
                variant="dark"
                className="flex w-fit"
              />
              {/* 30px: the logo sits in a 42px row in Figma, then 24px padding above the text. */}
              <p className="mt-7.5 max-w-62 text-body-sm-loose text-white/55">{footer.tagline}</p>
            </div>

            {columns.map((column) => (
              <nav key={column.id} aria-labelledby={column.id}>
                <h2 id={column.id} className="text-button text-white">
                  {column.heading}
                </h2>
                {/* The text style is on the list so each row is 20px tall (32px apart). */}
                <ul className="mt-5 grid gap-3 text-body-sm">
                  {Object.values(column.links).map((link) => (
                    <li key={link.label}>
                      <ContentLink
                        link={link}
                        newTabLabel={t('newTab')}
                        className="text-white/55 transition-colors hover:text-white"
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Figma lists 28px top and bottom padding, but the frame is 44px tall (28 + 16):
              only the top padding takes space; the footer's own 40px is the bottom spacing. */}
          <div className="flex flex-col gap-2 pt-7 sm:flex-row sm:justify-between sm:gap-3">
            <p className="text-caption text-white/40">{footer.copyright}</p>
            <p className="text-caption text-white/40">{footer.slogan}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
