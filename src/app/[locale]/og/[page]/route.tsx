import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { getContent } from '@/content';
import { routing, type Locale } from '@/i18n/routing';
import { LogoMark } from '@/lib/og-mark';
import { ogSlug } from '@/lib/og';
import { pagePaths } from '@/lib/metadata';
import { indexablePaths } from '@/lib/pages';
import { isProduction, siteUrl } from '@/lib/site-env';
import { isSupportSlug } from '@/content/shared';

const size = { width: 1200, height: 630 };

// Read once when the module loads (at build time): with Cache Components, file reads inside the
// handler count as uncached request-time IO and would stop the image from being pre-rendered.
const font = await readFile(join(process.cwd(), 'src/assets/fonts/Manrope-ExtraBold.ttf'));

/** Pre-render one image per page and language at build time. */
export function generateStaticParams() {
  return indexablePaths.map((path) => ({ page: ogSlug(path) }));
}

/** Title of a page in the OG image: the page title without the "TechSalem | " brand prefix. */
async function getTitle(locale: Locale, page: string): Promise<string | null> {
  if (isSupportSlug(page)) {
    const support = await getContent(locale, 'supportPages');
    return support[page].meta.title;
  }
  const key = (Object.keys(pagePaths) as (keyof typeof pagePaths)[]).find(
    (candidate) => ogSlug(pagePaths[candidate]) === page,
  );
  if (!key) return null;
  const { meta } = await getContent(locale, key);
  return meta.title.split(' | ').at(-1) ?? meta.title;
}

/**
 * Open Graph image (1200x630): navy background with the brand gradient accent, the logo mark, the
 * page title in Manrope ExtraBold and the domain. URL: /{locale}/og/{page}, e.g. /sv/og/about.
 */
export async function GET(_request: Request, ctx: RouteContext<'/[locale]/og/[page]'>) {
  const { locale, page } = await ctx.params;
  if (!routing.locales.includes(locale as Locale))
    return new Response('Not found', { status: 404 });

  const title = await getTitle(locale as Locale, page);
  if (!title) return new Response('Not found', { status: 404 });

  const { siteName } = await getContent(locale as Locale, 'site');

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#17233F',
        fontFamily: 'Manrope',
        color: '#FFFFFF',
        padding: '72px 80px',
      }}
    >
      {/* Brand gradient accent along the top (navy -> purple -> red) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 12,
          display: 'flex',
          background: 'linear-gradient(90deg, #17233F 0%, #5136A5 50%, #EF1747 100%)',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <LogoMark size={72} square="#FFFFFF" />
        <div style={{ fontSize: 44, fontWeight: 800 }}>{siteName}</div>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: title.length > 28 ? 84 : 104,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', fontSize: 30, fontWeight: 800, color: '#A9B0C5' }}>
        {isProduction ? siteUrl.host : 'techsalem.se'}
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Manrope', data: font, style: 'normal', weight: 800 }] },
  );
}
