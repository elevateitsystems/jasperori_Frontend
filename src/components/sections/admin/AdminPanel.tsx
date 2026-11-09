'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import {
  bookingUpdateEvent,
  readStoredBookings,
  writeStoredBookings,
  type StoredBooking,
} from '@/lib/booking/admin-storage';

type ContentByLocale = Record<Locale, Record<string, unknown>>;
type PanelTab = 'content' | 'bookings';

const contentStorageKey = 'techsalem.admin-content.v1';

const pageOptions = [
  ['home', 'Home'],
  ['about', 'About'],
  ['services', 'Services'],
  ['contactStrip', 'Shared contact strip'],
  ['contact', 'Contact'],
  ['booking', 'Booking'],
  ['supportPages', 'Support pages'],
  ['privacyPolicy', 'Privacy policy'],
  ['cookiePolicy', 'Cookie policy'],
  ['site', 'Site settings and footer'],
] as const;

const copy = {
  en: {
    title: 'Admin panel',
    subtitle: 'Manage website content and booking requests.',
    content: 'Page content',
    bookings: 'Bookings',
    locale: 'Language',
    page: 'Page',
    save: 'Save edits in this browser',
    export: 'Export page JSON',
    reset: 'Reset page edits',
    saved: 'Edits saved in this browser.',
    notice:
      'Page edits are stored in this browser and can be exported as JSON. Shared, live website publishing needs the site database connection.',
    invoices: 'Open invoice manager',
    empty: 'No booking requests are stored in this browser yet.',
    ref: 'Reference',
    customer: 'Customer',
    when: 'Date and time (UTC)',
    status: 'Status',
    actions: 'Actions',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    completed: 'Completed',
    cancel: 'Cancel booking',
    restore: 'Restore booking',
    complete: 'Mark complete',
    email: 'Email',
    company: 'Company',
    message: 'Message',
    close: 'Close',
    contentHelp: 'Edit the fields below. Image fields accept a path in /public or an image URL.',
    noBookings: 'No bookings found for this filter.',
  },
  sv: {
    title: 'Adminpanel',
    subtitle: 'Hantera webbplatsens innehåll och bokningar.',
    content: 'Sidinnehåll',
    bookings: 'Bokningar',
    locale: 'Språk',
    page: 'Sida',
    save: 'Spara ändringar i webbläsaren',
    export: 'Exportera sidans JSON',
    reset: 'Återställ sidändringar',
    saved: 'Ändringarna har sparats i webbläsaren.',
    notice:
      'Sidändringar sparas i den här webbläsaren och kan exporteras som JSON. Publicering på webbplatsen kräver en anslutning till webbplatsens databas.',
    invoices: 'Öppna fakturahantering',
    empty: 'Inga bokningar finns sparade i den här webbläsaren ännu.',
    ref: 'Referens',
    customer: 'Kund',
    when: 'Datum och tid (UTC)',
    status: 'Status',
    actions: 'Åtgärder',
    confirmed: 'Bekräftad',
    cancelled: 'Avbokad',
    completed: 'Genomförd',
    cancel: 'Avboka',
    restore: 'Återställ bokning',
    complete: 'Markera som genomförd',
    email: 'E-post',
    company: 'Företag',
    message: 'Meddelande',
    close: 'Stäng',
    contentHelp: 'Redigera fälten nedan. Bildfält tar emot en sökväg i /public eller en bild-URL.',
    noBookings: 'Inga bokningar hittades för filtret.',
  },
} as const;

function mergeObjects(base: unknown, override: unknown): unknown {
  if (Array.isArray(override) || override === null || typeof override !== 'object') return override;
  if (base === null || typeof base !== 'object' || Array.isArray(base)) return override;
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override)) {
    result[key] = key in result ? mergeObjects(result[key], value) : value;
  }
  return result;
}

function fieldName(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function replaceAtPath(value: unknown, path: (string | number)[], next: unknown): unknown {
  if (path.length === 0) return next;
  const [part, ...rest] = path;
  if (Array.isArray(value)) {
    return value.map((item, index) => (index === part ? replaceAtPath(item, rest, next) : item));
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return { ...record, [part]: replaceAtPath(record[part], rest, next) };
  }
  return value;
}

function ContentTree({
  value,
  path,
  onChange,
}: {
  value: unknown;
  path: (string | number)[];
  onChange: (path: (string | number)[], next: unknown) => void;
}) {
  const key = String(path[path.length - 1] ?? 'Content');
  const label = fieldName(key);
  const id = `content-${path.join('-')}`;

  if (typeof value === 'string') {
    const longText =
      value.length > 90 || /text|description|tagline|answer|paragraph|slogan/i.test(key);
    return (
      <div className="grid gap-2 border-b border-line py-3 last:border-0">
        <label htmlFor={id} className="text-body-sm font-semibold text-zinc-950">
          {label}
        </label>
        {longText ? (
          <textarea
            id={id}
            value={value}
            rows={3}
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full rounded-sm border border-line bg-white p-3 text-body-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
          />
        ) : (
          <input
            id={id}
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className="min-h-11 w-full rounded-sm border border-line bg-white px-3 text-body-sm outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
          />
        )}
        {key === 'src' && /^(\/|https?:\/\/|data:)/.test(value) ? (
          <Image
            src={value}
            alt=""
            width={520}
            height={240}
            unoptimized
            className="max-h-48 w-fit max-w-full rounded-sm border border-line object-contain"
          />
        ) : null}
      </div>
    );
  }

  if (typeof value === 'number') {
    return (
      <div className="grid gap-2 border-b border-line py-3 last:border-0">
        <label htmlFor={id} className="text-body-sm font-semibold text-zinc-950">
          {label}
        </label>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
          className="min-h-11 rounded-sm border border-line px-3 text-body-sm"
        />
      </div>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-3 border-b border-line py-3 text-body-sm font-semibold text-zinc-950">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
          className="size-4 accent-purple"
        />
        {label}
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <details open className="mt-3 rounded-sm border border-line bg-white p-4">
        <summary className="cursor-pointer text-title-18 font-bold text-navy">
          {label} ({value.length})
        </summary>
        <div className="mt-2 grid gap-2">
          {value.map((item, index) => (
            <ContentTree
              key={`${id}-${index}`}
              value={item}
              path={[...path, index]}
              onChange={onChange}
            />
          ))}
        </div>
      </details>
    );
  }

  if (value && typeof value === 'object') {
    return (
      <details open className="mt-3 rounded-sm border border-line bg-white p-4">
        <summary className="cursor-pointer text-title-18 font-bold text-navy">{label}</summary>
        <div className="mt-2 grid gap-2">
          {Object.entries(value).map(([childKey, child]) => (
            <ContentTree
              key={`${id}-${childKey}`}
              value={child}
              path={[...path, childKey]}
              onChange={onChange}
            />
          ))}
        </div>
      </details>
    );
  }

  return null;
}

export function AdminPanel({
  initialContent,
  defaultLocale,
  onLogout,
}: {
  initialContent: ContentByLocale;
  defaultLocale: Locale;
  onLogout: () => void;
}) {
  const words = copy[defaultLocale];
  const [tab, setTab] = useState<PanelTab>('content');
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [page, setPage] = useState<string>('home');
  const [content, setContent] = useState<ContentByLocale>(initialContent);
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(contentStorageKey);
      if (stored) {
        const overrides = JSON.parse(stored) as ContentByLocale;
        setContent({
          en: mergeObjects(initialContent.en, overrides.en ?? {}) as Record<string, unknown>,
          sv: mergeObjects(initialContent.sv, overrides.sv ?? {}) as Record<string, unknown>,
        });
      }
    } catch {
      setNotice('');
    }
    const refreshBookings = () => setBookings(readStoredBookings());
    refreshBookings();
    window.addEventListener('storage', refreshBookings);
    window.addEventListener(bookingUpdateEvent, refreshBookings);
    return () => {
      window.removeEventListener('storage', refreshBookings);
      window.removeEventListener(bookingUpdateEvent, refreshBookings);
    };
  }, [initialContent]);

  const pageContent = content[locale][page];

  function updateContent(path: (string | number)[], value: unknown) {
    setContent((current) => ({
      ...current,
      [locale]: {
        ...current[locale],
        [page]: replaceAtPath(current[locale][page], path, value),
      },
    }));
    setNotice('');
  }

  function saveContent() {
    localStorage.setItem(contentStorageKey, JSON.stringify(content));
    setNotice(words.saved);
  }

  function exportPage() {
    const file = new Blob([JSON.stringify({ locale, page, content: pageContent }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `techsalem-${page}-${locale}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function resetPage() {
    setContent((current) => ({
      ...current,
      [locale]: { ...current[locale], [page]: structuredClone(initialContent[locale][page]) },
    }));
    setNotice('');
  }

  function setBookingStatus(id: string, status: StoredBooking['status']) {
    const updated = bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking,
    );
    writeStoredBookings(updated);
    setBookings(updated);
  }

  return (
    <section className="min-h-[70vh] bg-cloud py-10 md:py-14">
      <div className="site-container">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-h2 text-zinc-950">{words.title}</h1>
              <p className="mt-2 text-body-sm text-ink-muted">{words.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/invoice"
                className="min-h-11 w-fit rounded-sm bg-navy px-4 py-3 text-button text-white hover:bg-navy-dark"
              >
                {words.invoices}
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="min-h-11 rounded-sm border border-navy px-4 text-button text-navy hover:bg-white"
              >
                {defaultLocale === 'sv' ? 'Logga ut' : 'Log out'}
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-2 border-b border-line">
            {(['content', 'bookings'] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                className={`min-h-11 border-b-2 px-4 text-button ${tab === value ? 'border-purple text-purple' : 'border-transparent text-ink-muted'}`}
              >
                {words[value]}
              </button>
            ))}
          </div>

          {tab === 'content' ? (
            <div className="mt-6 grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="grid gap-4 rounded-sm border border-line bg-white p-5">
                <label className="grid gap-2 text-body-sm font-semibold text-zinc-950">
                  {words.locale}
                  <select
                    value={locale}
                    onChange={(event) => setLocale(event.target.value as Locale)}
                    className="min-h-11 rounded-sm border border-line px-3"
                  >
                    <option value="sv">Svenska</option>
                    <option value="en">English</option>
                  </select>
                </label>
                <label className="grid gap-2 text-body-sm font-semibold text-zinc-950">
                  {words.page}
                  <select
                    value={page}
                    onChange={(event) => setPage(event.target.value)}
                    className="min-h-11 rounded-sm border border-line px-3"
                  >
                    {pageOptions.map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <p className="text-caption leading-relaxed text-ink-muted">{words.notice}</p>
                <button
                  type="button"
                  onClick={saveContent}
                  className="min-h-11 rounded-sm bg-navy px-4 text-button text-white hover:bg-navy-dark"
                >
                  {words.save}
                </button>
                <button
                  type="button"
                  onClick={exportPage}
                  className="min-h-11 rounded-sm border border-navy px-4 text-button text-navy hover:bg-cloud"
                >
                  {words.export}
                </button>
                <button
                  type="button"
                  onClick={resetPage}
                  className="min-h-11 rounded-sm border border-line px-4 text-button text-ink-muted hover:bg-cloud"
                >
                  {words.reset}
                </button>
                {notice ? (
                  <p role="status" className="text-body-sm text-purple">
                    {notice}
                  </p>
                ) : null}
              </aside>
              <div>
                <p className="mb-4 text-body-sm text-ink-muted">{words.contentHelp}</p>
                <ContentTree value={pageContent} path={[]} onChange={updateContent} />
              </div>
            </div>
          ) : (
            <BookingManager
              bookings={bookings}
              locale={locale}
              onStatus={setBookingStatus}
              words={words}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function BookingManager({
  bookings,
  locale,
  onStatus,
  words,
}: {
  bookings: StoredBooking[];
  locale: Locale;
  onStatus: (id: string, status: StoredBooking['status']) => void;
  words: (typeof copy)[Locale];
}) {
  const [filter, setFilter] = useState<'all' | StoredBooking['status']>('all');
  const visible = bookings
    .filter((booking) => filter === 'all' || booking.status === filter)
    .sort((a, b) => a.slot.start.localeCompare(b.slot.start));
  const language = locale === 'sv' ? 'sv-SE' : 'en-GB';

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-ink-muted">
          {bookings.length} · {words.bookings}
        </p>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as typeof filter)}
          className="min-h-11 w-fit rounded-sm border border-line bg-white px-3 text-body-sm"
        >
          <option value="all">All</option>
          <option value="confirmed">{words.confirmed}</option>
          <option value="cancelled">{words.cancelled}</option>
          <option value="completed">{words.completed}</option>
        </select>
      </div>
      {visible.length ? (
        <ul className="grid gap-4">
          {visible.map((booking) => (
            <li key={booking.id} className="rounded-sm border border-line bg-white p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-title-18 font-bold text-zinc-950">
                    {booking.name}{' '}
                    <span className="font-normal text-ink-muted">· {booking.id}</span>
                  </p>
                  <p className="mt-1 text-body-sm text-ink-muted">
                    {new Intl.DateTimeFormat(language, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'UTC',
                    }).format(new Date(booking.slot.start))}{' '}
                    UTC
                  </p>
                  <p className="mt-1 text-body-sm">
                    <a href={`mailto:${booking.email}`} className="underline underline-offset-2">
                      {booking.email}
                    </a>
                    {booking.company ? ` · ${booking.company}` : ''}
                  </p>
                  {booking.message ? (
                    <p className="mt-3 max-w-180 text-body-sm whitespace-pre-wrap text-ink-muted">
                      {booking.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-lavender px-3 py-1 text-caption font-bold text-purple">
                    {words[booking.status]}
                  </span>
                  {booking.status === 'confirmed' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onStatus(booking.id, 'completed')}
                        className="min-h-10 rounded-sm border border-line px-3 text-caption font-bold hover:bg-cloud"
                      >
                        {words.complete}
                      </button>
                      <button
                        type="button"
                        onClick={() => onStatus(booking.id, 'cancelled')}
                        className="min-h-10 rounded-sm border border-red-text px-3 text-caption font-bold text-red-text hover:bg-red-text/5"
                      >
                        {words.cancel}
                      </button>
                    </>
                  ) : booking.status === 'cancelled' ? (
                    <button
                      type="button"
                      onClick={() => onStatus(booking.id, 'confirmed')}
                      className="min-h-10 rounded-sm border border-line px-3 text-caption font-bold hover:bg-cloud"
                    >
                      {words.restore}
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-sm border border-line bg-white p-6 text-body-sm text-ink-muted">
          {bookings.length ? words.noBookings : words.empty}
        </p>
      )}
    </div>
  );
}
