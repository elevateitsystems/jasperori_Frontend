import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getLocale } from 'next-intl/server';

import { AdminPanel } from '@/components/sections/admin/AdminPanel';
import { AdminLogin } from '@/components/sections/admin/AdminPortal';
import { getAdminSession } from '@/lib/auth/session';
import { listBookings } from '@/lib/booking/repository';
import { contentKeys } from '@/lib/db/defaults';
import { readPublished } from '@/lib/db/content';
import type { Locale } from '@/i18n/routing';

const editableKeys = contentKeys.filter((key) => key !== 'notFound');

async function localeContent(locale: Locale) {
  const entries = await Promise.all(
    editableKeys.map(async (key) => [key, await readPublished(locale, key)] as const),
  );
  return Object.fromEntries(entries) as Record<string, unknown>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Admin panel',
    robots: { index: false, follow: false },
  };
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-cloud" aria-busy="true" />}>
      <AdminGate />
    </Suspense>
  );
}

/** Session cookies cannot be part of the static shell, so this streams in behind Suspense. */
async function AdminGate() {
  const [locale, session] = await Promise.all([getLocale(), getAdminSession()]);
  if (!session) return <AdminLogin locale={locale} />;

  const [sv, en, bookings] = await Promise.all([
    localeContent('sv'),
    localeContent('en'),
    listBookings(),
  ]);

  return (
    <AdminPanel
      defaultLocale={locale}
      email={session.email}
      initialContent={{ sv, en }}
      initialBookings={bookings}
    />
  );
}
