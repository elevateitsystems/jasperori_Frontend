'use client';

import Image from 'next/image';
import { useEffect, useState, type ChangeEvent } from 'react';

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
    reset: 'Reset page edits',
    saved: 'Edits saved in this browser.',
    saveFailed: 'Unable to save changes. Browser storage may be full or unavailable.',
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
    contentHelp: 'Edit the fields below. Upload image files directly from your computer.',
    uploadImage: 'Upload image',
    changeImage: 'Change image',
    removeImage: 'Remove image',
    noImage: 'No image selected.',
    uploadingImage: 'Preparing image…',
    imageUploadFailed: 'This image could not be processed. Please try another file.',
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
    reset: 'Återställ sidändringar',
    saved: 'Ändringarna har sparats i webbläsaren.',
    saveFailed: 'Det gick inte att spara. Webbläsarens lagring kan vara full eller otillgänglig.',
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
    contentHelp: 'Redigera fälten nedan. Ladda upp bildfiler direkt från din dator.',
    uploadImage: 'Ladda upp bild',
    changeImage: 'Byt bild',
    removeImage: 'Ta bort bild',
    noImage: 'Ingen bild vald.',
    uploadingImage: 'Förbereder bilden…',
    imageUploadFailed: 'Bilden kunde inte bearbetas. Försök med en annan fil.',
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

async function prepareImage(file: File): Promise<{ src: string; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  try {
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Unable to prepare image canvas.');
    context.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) resolve(result);
          else reject(new Error('Unable to encode uploaded image.'));
        },
        'image/webp',
        0.82,
      );
    });

    const src = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject(new Error('Unable to read prepared image.'));
      };
      reader.onerror = () => reject(reader.error ?? new Error('Unable to read prepared image.'));
      reader.readAsDataURL(blob);
    });

    return { src, width, height };
  } finally {
    bitmap.close();
  }
}

function ImageField({
  id,
  path,
  value,
  onChange,
  words,
}: {
  id: string;
  path: (string | number)[];
  value: string;
  onChange: (
    path: (string | number)[],
    value: unknown,
    dimensions?: { width: number; height: number },
  ) => void;
  words: (typeof copy)[Locale];
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const hasImage = /^(\/|https?:\/\/|data:image\/)/.test(value);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    setError('');
    setIsUploading(true);
    try {
      const image = await prepareImage(file);
      onChange(path, image.src, { width: image.width, height: image.height });
    } catch {
      setError(words.imageUploadFailed);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="grid gap-3 border-b border-line py-3 last:border-0">
      <span className="text-body-sm font-semibold text-zinc-950">{fieldName('src')}</span>
      {hasImage ? (
        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-sm border border-line bg-cloud">
          <Image
            src={value}
            alt=""
            fill
            unoptimized
            className="object-contain"
            sizes="(max-width: 448px) 100vw, 448px"
          />
        </div>
      ) : (
        <p className="text-caption text-ink-muted">{words.noImage}</p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-sm bg-navy px-4 text-button text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-purple hover:bg-navy-dark">
          {isUploading ? words.uploadingImage : hasImage ? words.changeImage : words.uploadImage}
          <input
            id={id}
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={handleUpload}
            className="sr-only"
          />
        </label>
        {hasImage ? (
          <button
            type="button"
            onClick={() => {
              setError('');
              onChange(path, '');
            }}
            className="min-h-11 rounded-sm border border-line px-4 text-button text-ink-muted hover:bg-cloud"
          >
            {words.removeImage}
          </button>
        ) : null}
      </div>
      {error ? (
        <p role="alert" className="text-body-sm text-red-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ContentTree({
  value,
  path,
  onChange,
  words,
}: {
  value: unknown;
  path: (string | number)[];
  onChange: (
    path: (string | number)[],
    value: unknown,
    dimensions?: { width: number; height: number },
  ) => void;
  words: (typeof copy)[Locale];
}) {
  const key = String(path[path.length - 1] ?? 'Content');
  const label = fieldName(key);
  const id = `content-${path.join('-')}`;

  if (typeof value === 'string') {
    if (key === 'src') {
      return <ImageField id={id} path={path} value={value} onChange={onChange} words={words} />;
    }

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
      <details open={path.length === 0} className="mt-3 rounded-sm border border-line bg-white p-4">
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
              words={words}
            />
          ))}
        </div>
      </details>
    );
  }

  if (value && typeof value === 'object') {
    return (
      <details open={path.length === 0} className="mt-3 rounded-sm border border-line bg-white p-4">
        <summary className="cursor-pointer text-title-18 font-bold text-navy">{label}</summary>
        <div className="mt-2 grid gap-2">
          {Object.entries(value).map(([childKey, child]) => (
            <ContentTree
              key={`${id}-${childKey}`}
              value={child}
              path={[...path, childKey]}
              onChange={onChange}
              words={words}
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

  const selectedPageLabel = pageOptions.find(([key]) => key === page)?.[1] ?? page;

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

  function updateContent(
    path: (string | number)[],
    value: unknown,
    dimensions?: { width: number; height: number },
  ) {
    setContent((current) => {
      let nextPage = replaceAtPath(current[locale][page], path, value);
      if (dimensions) {
        const imagePath = path.slice(0, -1);
        nextPage = replaceAtPath(nextPage, [...imagePath, 'width'], dimensions.width);
        nextPage = replaceAtPath(nextPage, [...imagePath, 'height'], dimensions.height);
      }

      return {
        ...current,
        [locale]: {
          ...current[locale],
          [page]: nextPage,
        },
      };
    });
    setNotice('');
  }

  function saveContent() {
    try {
      localStorage.setItem(contentStorageKey, JSON.stringify(content));
      setNotice(words.saved);
    } catch {
      setNotice(words.saveFailed);
    }
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
                <button
                  type="button"
                  onClick={saveContent}
                  className="min-h-11 rounded-sm bg-navy px-4 text-button text-white hover:bg-navy-dark"
                >
                  {words.save}
                </button>
                <button
                  type="button"
                  onClick={resetPage}
                  className="min-h-11 rounded-sm border border-line px-4 text-button text-ink-muted hover:bg-cloud"
                >
                  {words.reset}
                </button>
                {notice ? (
                  <p
                    role="status"
                    className={`text-body-sm ${notice === words.saveFailed ? 'text-red-text' : 'text-purple'}`}
                  >
                    {notice}
                  </p>
                ) : null}
              </aside>
              <div>
                <h2 aria-live="polite" className="mb-3 text-title-24 font-bold text-zinc-950">
                  {selectedPageLabel}
                </h2>
                <p className="mb-4 text-body-sm text-ink-muted">{words.contentHelp}</p>
                <ContentTree
                  key={page}
                  value={pageContent}
                  path={[]}
                  onChange={updateContent}
                  words={words}
                />
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
