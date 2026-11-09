import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { AdminPortal } from '@/components/sections/admin/AdminPortal';
import { getContent } from '@/content';
import type { Locale } from '@/i18n/routing';
import type { ContentKey } from '@/types/content';

const editableKeys = [
  'site',
  'contactStrip',
  'home',
  'about',
  'services',
  'supportPages',
  'contact',
  'booking',
  'privacyPolicy',
  'cookiePolicy',
] as const satisfies readonly ContentKey[];

async function getLocaleContent(locale: Locale) {
  const entries = await Promise.all(
    editableKeys.map(async (key) => [key, await getContent(locale, key)] as const),
  );
  return Object.fromEntries(entries) as Record<string, unknown>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Admin panel',
    robots: { index: false, follow: false },
  };
}

export default async function AdminPage() {
  const defaultLocale = await getLocale();
  const [sv, en] = await Promise.all([getLocaleContent('sv'), getLocaleContent('en')]);

  return <AdminPortal defaultLocale={defaultLocale} initialContent={{ sv, en }} />;
}
