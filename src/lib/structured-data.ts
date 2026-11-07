import { getContent } from '@/content';
import { isSupportSlug } from '@/content/shared';
import type { Locale } from '@/i18n/routing';
import { pagePaths } from '@/lib/metadata';
import { siteUrl } from '@/lib/site-env';
import type { InternalPath, PageKey, SupportSlug } from '@/types/content';

const abs = (path: string) => new URL(path, siteUrl).toString();
const localized = (locale: Locale, path: InternalPath) =>
  abs(`/${locale}${path === '/' ? '' : path}`);

/**
 * `Organization` (ProfessionalService) and `WebSite` for the site layout. The email comes from the
 * site settings (footer "Connect" links). `sameAs` lists only real social URLs: links that are
 * still '#' placeholders are left out, so it fills itself once the client's URLs are in the content.
 */
export async function getSiteStructuredData(locale: Locale) {
  const site = await getContent(locale, 'site');
  const { linkedin, facebook, email } = site.footer.connect.links;
  const sameAs = [linkedin, facebook]
    .map((l) => l.href)
    .filter((href) => href.startsWith('https://'));

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': abs('/#organization'),
      name: site.siteName,
      url: localized(locale, '/'),
      logo: abs('/icon.svg'),
      email: email.label,
      description: site.footer.tagline,
      areaServed: { '@type': 'Country', name: 'Sweden' },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': abs('/#website'),
      name: site.siteName,
      url: localized(locale, '/'),
      inLanguage: locale,
      publisher: { '@id': abs('/#organization') },
    },
  ];
}

/** `BreadcrumbList` for an inner page: Home > page (support pages: Home > Support > page). */
export async function getBreadcrumbData(
  locale: Locale,
  key: Exclude<PageKey, 'home' | 'notFound'> | SupportSlug,
) {
  const [site, supportPages] = await Promise.all([
    getContent(locale, 'site'),
    getContent(locale, 'supportPages'),
  ]);
  const trail: { name: string; path: InternalPath }[] = [
    { name: site.navigation.home.label, path: '/' },
  ];

  if (isSupportSlug(key)) {
    const path = `/support/${key}` as const;
    // The "Support" menu item points at the first support page: don't list the same URL twice.
    if (site.navigation.support.href !== path) {
      trail.push({ name: site.navigation.support.label, path: site.navigation.support.href });
    }
    trail.push({ name: supportPages[key].meta.title, path });
  } else {
    const { meta } = await getContent(locale, key);
    trail.push({ name: meta.title, path: pagePaths[key] });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: localized(locale, item.path),
    })),
  };
}
