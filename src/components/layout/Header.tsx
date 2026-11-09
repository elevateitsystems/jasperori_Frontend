import { getLocale, getTranslations } from 'next-intl/server';
import { UserRound } from 'lucide-react';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Logo } from '@/components/ui/Logo';
import { getContent } from '@/content';
import { Link } from '@/i18n/navigation';

import { LanguageSwitch } from './LanguageSwitch';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';

/**
 * Site header (spec: home.md, first block). White, 68px tall, 12px vertical padding, content in
 * the site container. Logo | navigation | language switch + CTA, spread with equal gaps
 * (justify-between reproduces the Figma positions exactly). Below `lg` the navigation, switch and
 * CTA move into the mobile menu. Not sticky: the design shows no sticky behaviour.
 */
export async function Header() {
  const locale = await getLocale();
  const [site, t] = await Promise.all([getContent(locale, 'site'), getTranslations('a11y')]);

  const navLinks = [
    site.navigation.home,
    site.navigation.support,
    site.navigation.services,
    site.navigation.contact,
    site.navigation.about,
  ];
  const { cta } = site.header;

  return (
    <header className="relative z-40 bg-white">
      <div className="site-container flex h-header items-center justify-between gap-6 py-3">
        <Logo
          name={site.siteName}
          label={t('homeLink', { siteName: site.siteName })}
          variant="light"
        />

        <nav aria-label={t('mainNavigation')} className="hidden lg:block">
          <NavLinks links={navLinks} variant="desktop" />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch />
          <AdminDashboardLink />
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>

        <MobileMenu>
          <div className="site-container flex flex-col gap-8 pt-2 pb-10">
            <nav aria-label={t('mainNavigation')}>
              <NavLinks links={navLinks} variant="mobile" />
            </nav>
            <LanguageSwitch className="self-start" />
            <div className="flex items-center gap-3">
              <AdminDashboardLink />
              <ButtonLink href={cta.href} className="w-full">
                {cta.label}
              </ButtonLink>
            </div>
          </div>
        </MobileMenu>
      </div>
    </header>
  );
}

function AdminDashboardLink() {
  return (
    <Link
      href="/admin"
      aria-label="Admin Dashboard"
      title="Admin Dashboard"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-navy transition-colors hover:bg-cloud hover:text-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
    >
      <UserRound aria-hidden="true" className="size-5" strokeWidth={1.8} />
    </Link>
  );
}
