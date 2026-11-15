'use client';

import { CalendarDays, ExternalLink, FileText, LogOut, Receipt } from 'lucide-react';
import Image from 'next/image';
import { useState, type ChangeEvent } from 'react';

import {
  logoutAdmin,
  restoreContentPage,
  saveContentPage,
  updateBookingStatus,
} from '@/app/[locale]/admin/actions';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { BookingRecord } from '@/lib/booking/types';

type ContentByLocale = Record<Locale, Record<string, unknown>>;
type PanelTab = 'content' | 'bookings';

const pageOptions = [
  ['home', { en: 'Home', sv: 'Hem' }],
  ['about', { en: 'About', sv: 'Om oss' }],
  ['services', { en: 'Services', sv: 'Tjänster' }],
  ['contactStrip', { en: 'Shared contact strip', sv: 'Delad kontaktrad' }],
  ['contact', { en: 'Contact', sv: 'Kontakt' }],
  ['booking', { en: 'Booking', sv: 'Bokning' }],
  ['supportPages', { en: 'Support pages', sv: 'Supportsidor' }],
  ['privacyPolicy', { en: 'Privacy policy', sv: 'Integritetspolicy' }],
  ['cookiePolicy', { en: 'Cookie policy', sv: 'Cookiepolicy' }],
  ['site', { en: 'Site settings and footer', sv: 'Webbplats och sidfot' }],
] as const;

const fieldClass =
  'w-full rounded-md border border-line bg-white px-3 text-body-sm text-zinc-950 outline-none focus:border-purple focus:ring-2 focus:ring-purple/20';

const copy = {
  en: {
    title: 'Admin panel',
    subtitle: 'Manage website content and booking requests.',
    content: 'Page content',
    bookings: 'Bookings',
    locale: 'Language',
    page: 'Page',
    save: 'Save this page',
    saving: 'Saving…',
    reset: 'Restore original text',
    resetConfirm: 'Restore the original text for this page on the live site?',
    restored: 'Original text restored. The live site is updated.',
    saved: 'Saved. The live site is updated.',
    saveFailed: 'The page could not be saved. Sign in again if your session has expired.',
    slotTaken: 'That time is already booked by another request.',
    logout: 'Log out',
    invoices: 'Open invoice manager',
    empty: 'No booking requests yet.',
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
    contentHelp: 'Choose a page, edit its fields, then save. The live site updates immediately.',
    pages: 'Pages',
    viewSite: 'View website',
    imageSettings: 'Image size and position',
    all: 'All',
    draftHint: 'Edits stay here until you save.',
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
    save: 'Spara den här sidan',
    saving: 'Sparar…',
    reset: 'Återställ originaltext',
    resetConfirm: 'Återställa originaltexten för den här sidan på den live-webbplatsen?',
    restored: 'Originaltexten är återställd. Webbplatsen är uppdaterad.',
    saved: 'Sparat. Webbplatsen är uppdaterad.',
    saveFailed: 'Sidan kunde inte sparas. Logga in igen om sessionen har gått ut.',
    slotTaken: 'Den tiden är redan bokad av en annan förfrågan.',
    logout: 'Logga ut',
    invoices: 'Öppna fakturahantering',
    empty: 'Inga bokningsförfrågningar ännu.',
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
    contentHelp: 'Välj en sida, redigera fälten och spara. Webbplatsen uppdateras direkt.',
    pages: 'Sidor',
    viewSite: 'Visa webbplatsen',
    imageSettings: 'Bildstorlek och position',
    all: 'Alla',
    draftHint: 'Ändringarna ligger kvar här tills du sparar.',
    uploadImage: 'Ladda upp bild',
    changeImage: 'Byt bild',
    removeImage: 'Ta bort bild',
    noImage: 'Ingen bild vald.',
    uploadingImage: 'Förbereder bilden…',
    imageUploadFailed: 'Bilden kunde inte bearbetas. Försök med en annan fil.',
    noBookings: 'Inga bokningar hittades för filtret.',
  },
} as const;

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
    <div className="grid gap-3">
      {hasImage ? (
        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-line bg-cloud">
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
        <label className="inline-flex min-h-10 cursor-pointer items-center rounded-md bg-navy px-3 text-caption font-bold text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-purple hover:bg-navy-dark">
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
            className="min-h-10 rounded-md border border-line px-3 text-caption font-bold text-ink-muted hover:bg-cloud"
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
  defaultOpen = false,
}: {
  value: unknown;
  path: (string | number)[];
  onChange: (
    path: (string | number)[],
    value: unknown,
    dimensions?: { width: number; height: number },
  ) => void;
  words: (typeof copy)[Locale];
  defaultOpen?: boolean;
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
      <div className="grid gap-2">
        <label htmlFor={id} className="text-caption font-semibold text-zinc-950">
          {label}
        </label>
        {longText ? (
          <textarea
            id={id}
            value={value}
            rows={4}
            onChange={(event) => onChange(path, event.target.value)}
            className={`${fieldClass} py-2`}
          />
        ) : (
          <input
            id={id}
            value={value}
            onChange={(event) => onChange(path, event.target.value)}
            className={`${fieldClass} min-h-11`}
          />
        )}
      </div>
    );
  }

  if (typeof value === 'number') {
    return (
      <div className="grid gap-2">
        <label htmlFor={id} className="text-caption font-semibold text-zinc-950">
          {label}
        </label>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
          className={`${fieldClass} min-h-11`}
        />
      </div>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <label className="flex min-h-11 items-center gap-3 rounded-md border border-line bg-white px-3 text-body-sm font-semibold text-zinc-950">
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
      <details className="rounded-lg border border-line bg-cloud/60 p-4">
        <summary className="cursor-pointer text-body-sm font-bold text-navy">
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
    const record = value as Record<string, unknown>;
    if (path.length === 0) {
      return (
        <div className="grid gap-3">
          {Object.entries(record).map(([childKey, child], index) => (
            <ContentTree
              key={`${id}-${childKey}`}
              value={child}
              path={[childKey]}
              onChange={onChange}
              words={words}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      );
    }

    if (typeof record.src === 'string') {
      const advancedKeys = ['width', 'height', 'focalPoint'].filter(
        (childKey) => childKey in record,
      );
      const otherKeys = Object.keys(record).filter(
        (childKey) => childKey !== 'src' && !advancedKeys.includes(childKey),
      );
      return (
        <section className="rounded-lg border border-line bg-white p-4">
          <h3 className="text-body-sm font-bold text-navy">{label}</h3>
          <div className="mt-3 grid gap-3">
            <ImageField
              id={`${id}-src`}
              path={[...path, 'src']}
              value={record.src}
              onChange={onChange}
              words={words}
            />
            {otherKeys.map((childKey) => (
              <ContentTree
                key={`${id}-${childKey}`}
                value={record[childKey]}
                path={[...path, childKey]}
                onChange={onChange}
                words={words}
              />
            ))}
            {advancedKeys.length ? (
              <details className="rounded-md bg-cloud px-3 py-2">
                <summary className="cursor-pointer text-caption font-semibold text-ink-muted">
                  {words.imageSettings}
                </summary>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {advancedKeys.map((childKey) => (
                    <ContentTree
                      key={`${id}-${childKey}`}
                      value={record[childKey]}
                      path={[...path, childKey]}
                      onChange={onChange}
                      words={words}
                    />
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        </section>
      );
    }

    return (
      <details open={defaultOpen} className="rounded-lg border border-line bg-white p-4">
        <summary className="cursor-pointer text-body-sm font-bold text-navy">{label}</summary>
        <div className="mt-4 grid gap-3">
          {Object.entries(record).map(([childKey, child]) => (
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
  initialBookings,
  defaultLocale,
  email,
}: {
  initialContent: ContentByLocale;
  initialBookings: BookingRecord[];
  defaultLocale: Locale;
  email: string;
}) {
  const words = copy[defaultLocale];
  const [tab, setTab] = useState<PanelTab>('content');
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [page, setPage] = useState<string>('home');
  const [content, setContent] = useState<ContentByLocale>(initialContent);
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedOption = pageOptions.find(([key]) => key === page);
  const selectedPageLabel = selectedOption ? selectedOption[1][defaultLocale] : page;
  const noticeIsError = notice === words.saveFailed || notice === words.slotTaken;
  const pageContent = content[locale]?.[page];

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

  async function saveContent() {
    setSaving(true);
    setNotice('');
    try {
      const result = await saveContentPage(locale, page, pageContent);
      if (!result.ok) {
        setNotice(words.saveFailed);
        return;
      }
      setContent((current) => ({
        ...current,
        [locale]: { ...current[locale], [page]: result.data },
      }));
      setNotice(words.saved);
    } catch {
      setNotice(words.saveFailed);
    } finally {
      setSaving(false);
    }
  }

  async function resetPage() {
    if (!window.confirm(words.resetConfirm)) return;
    setSaving(true);
    setNotice('');
    try {
      const result = await restoreContentPage(locale, page);
      if (!result.ok) {
        setNotice(words.saveFailed);
        return;
      }
      setContent((current) => ({
        ...current,
        [locale]: { ...current[locale], [page]: result.data },
      }));
      setNotice(words.restored);
    } catch {
      setNotice(words.saveFailed);
    } finally {
      setSaving(false);
    }
  }

  async function changeBookingStatus(id: string, status: BookingRecord['status']) {
    setNotice('');
    try {
      const result = await updateBookingStatus(id, status);
      if (!result.ok) {
        setNotice(result.error === 'conflict' ? words.slotTaken : words.saveFailed);
        return;
      }
      setBookings(result.bookings);
    } catch {
      setNotice(words.saveFailed);
    }
  }

  return (
    <div data-admin-shell className="flex min-h-dvh bg-cloud text-zinc-950">
      <aside className="sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col bg-navy md:flex">
        <div className="px-5 pt-6 pb-4">
          <p className="text-title-18 font-extrabold tracking-tight text-white">TechSalem</p>
          <p className="mt-1 text-caption text-white/70">{words.title}</p>
        </div>
        <nav aria-label={words.title} className="flex flex-1 flex-col gap-1 px-3">
          <button
            type="button"
            onClick={() => setTab('content')}
            className={sideItemClass(tab === 'content')}
            aria-current={tab === 'content' ? 'page' : undefined}
          >
            <FileText aria-hidden="true" className="size-4 shrink-0" />
            {words.content}
          </button>
          <button
            type="button"
            onClick={() => setTab('bookings')}
            className={sideItemClass(tab === 'bookings')}
            aria-current={tab === 'bookings' ? 'page' : undefined}
          >
            <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
            <span className="min-w-0 flex-1 text-left">{words.bookings}</span>
            <span className="text-caption">{bookings.length}</span>
          </button>
          <Link href="/invoice" className={sideItemClass(false)}>
            <Receipt aria-hidden="true" className="size-4 shrink-0" />
            {words.invoices}
          </Link>
          <Link href="/" className={sideItemClass(false)}>
            <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
            {words.viewSite}
          </Link>
        </nav>
        <div className="border-t border-white/10 p-4 pb-16">
          <p className="truncate text-caption text-white/70">{email}</p>
          <form action={logoutAdmin} className="mt-3">
            <input type="hidden" name="locale" value={defaultLocale} />
            <button
              type="submit"
              className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-button text-white hover:bg-white/10"
            >
              <LogOut aria-hidden="true" className="size-4" />
              {words.logout}
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-white">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 md:hidden">
            <button
              type="button"
              onClick={() => setTab('content')}
              className={mobileItemClass(tab === 'content')}
            >
              {words.content}
            </button>
            <button
              type="button"
              onClick={() => setTab('bookings')}
              className={mobileItemClass(tab === 'bookings')}
            >
              {words.bookings}
            </button>
            <Link href="/invoice" className={mobileItemClass(false)}>
              {words.invoices}
            </Link>
            <Link href="/" className={mobileItemClass(false)}>
              {words.viewSite}
            </Link>
            <form action={logoutAdmin}>
              <input type="hidden" name="locale" value={defaultLocale} />
              <button type="submit" className={mobileItemClass(false)}>
                {words.logout}
              </button>
            </form>
          </div>
          <div className="flex items-end justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <p className="text-caption font-semibold tracking-wide text-ink-muted uppercase">
                {tab === 'content' ? words.content : words.bookings}
              </p>
              <h1 className="mt-1 text-title-24 font-extrabold tracking-tight text-zinc-950">
                {tab === 'content' ? selectedPageLabel : words.bookings}
              </h1>
            </div>
            <p className="hidden text-caption text-ink-muted md:block">{email}</p>
          </div>
        </header>

        <div className={`flex-1 px-4 py-5 md:px-8 md:py-6 ${tab === 'content' ? 'pb-8' : ''}`}>
          {tab === 'content' ? (
            <div className="grid items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="rounded-xl border border-line bg-white p-3 lg:sticky lg:top-28">
                <p className="px-2 text-caption font-semibold tracking-wide text-ink-muted uppercase">
                  {words.locale}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg bg-cloud p-1">
                  {(['sv', 'en'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setLocale(value)}
                      className={`min-h-10 rounded-md text-button ${
                        locale === value ? 'shadow-sm bg-white text-navy' : 'text-ink-muted'
                      }`}
                      aria-pressed={locale === value}
                    >
                      {value === 'sv' ? 'Svenska' : 'English'}
                    </button>
                  ))}
                </div>
                <p className="mt-4 px-2 text-caption font-semibold tracking-wide text-ink-muted uppercase">
                  {words.pages}
                </p>
                <div className="mt-2 grid gap-1">
                  {pageOptions.map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPage(key)}
                      aria-current={page === key ? 'true' : undefined}
                      className={`rounded-md px-3 py-2 text-left text-body-sm ${
                        page === key
                          ? 'bg-lavender font-semibold text-purple'
                          : 'text-zinc-950 hover:bg-cloud'
                      }`}
                    >
                      {label[defaultLocale]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-body-sm text-ink-muted">{words.contentHelp}</p>
                {pageContent !== undefined ? (
                  <ContentTree
                    key={`${locale}-${page}`}
                    value={pageContent}
                    path={[]}
                    onChange={updateContent}
                    words={words}
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <div>
              {notice ? (
                <p
                  role="status"
                  className={`mb-4 rounded-md px-3 py-2 text-body-sm ${
                    noticeIsError ? 'bg-red-text/10 text-red-text' : 'bg-lavender text-purple'
                  }`}
                >
                  {notice}
                </p>
              ) : null}
              <BookingManager
                bookings={bookings}
                locale={locale}
                onStatus={changeBookingStatus}
                words={words}
              />
            </div>
          )}
        </div>

        {tab === 'content' ? (
          <div className="sticky bottom-0 z-20 flex flex-wrap items-center gap-3 border-t border-line bg-white px-4 py-3 md:px-8">
            <button
              type="button"
              onClick={saveContent}
              disabled={saving || pageContent === undefined}
              className="min-h-11 rounded-md bg-navy px-4 text-button text-white hover:bg-navy-dark disabled:opacity-60"
            >
              {saving ? words.saving : words.save}
            </button>
            <button
              type="button"
              onClick={resetPage}
              disabled={saving}
              className="min-h-11 rounded-md border border-line px-4 text-button text-ink-muted hover:bg-cloud disabled:opacity-60"
            >
              {words.reset}
            </button>
            {notice ? (
              <p
                role="status"
                className={`text-body-sm ${noticeIsError ? 'text-red-text' : 'text-purple'}`}
              >
                {notice}
              </p>
            ) : (
              <p className="text-caption text-ink-muted">{words.draftHint}</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function sideItemClass(active: boolean) {
  return `flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-button ${
    active ? 'bg-white text-navy' : 'text-white/80 hover:bg-white/10'
  }`;
}

function mobileItemClass(active: boolean) {
  return `inline-flex min-h-10 shrink-0 items-center rounded-md px-3 text-button ${
    active ? 'bg-navy text-white' : 'bg-cloud text-navy'
  }`;
}

function statusClass(status: BookingRecord['status']) {
  if (status === 'confirmed') return 'bg-lavender text-purple';
  if (status === 'completed') return 'bg-navy/10 text-navy';
  return 'bg-cloud text-ink-muted';
}

function BookingManager({
  bookings,
  locale,
  onStatus,
  words,
}: {
  bookings: BookingRecord[];
  locale: Locale;
  onStatus: (id: string, status: BookingRecord['status']) => void;
  words: (typeof copy)[Locale];
}) {
  const [filter, setFilter] = useState<'all' | BookingRecord['status']>('all');
  const visible = bookings
    .filter((booking) => filter === 'all' || booking.status === filter)
    .sort((a, b) => a.slot.start.localeCompare(b.slot.start));
  const language = locale === 'sv' ? 'sv-SE' : 'en-GB';
  const counts = {
    all: bookings.length,
    confirmed: bookings.filter((booking) => booking.status === 'confirmed').length,
    cancelled: bookings.filter((booking) => booking.status === 'cancelled').length,
    completed: bookings.filter((booking) => booking.status === 'completed').length,
  };
  const filters = [
    ['all', words.all],
    ['confirmed', words.confirmed],
    ['cancelled', words.cancelled],
    ['completed', words.completed],
  ] as const;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`min-h-10 rounded-full px-3 text-caption font-bold ${
              filter === value ? 'bg-navy text-white' : 'border border-line bg-white text-ink-muted'
            }`}
          >
            {label} {counts[value]}
          </button>
        ))}
      </div>
      {visible.length ? (
        <ul className="grid gap-3">
          {visible.map((booking) => (
            <li key={booking.id} className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-title-18 font-bold text-zinc-950">{booking.name}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-caption font-bold ${statusClass(booking.status)}`}
                    >
                      {words[booking.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-caption text-ink-muted">{booking.id}</p>
                  <p className="mt-2 text-body-sm text-zinc-950">
                    {new Intl.DateTimeFormat(language, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'UTC',
                    }).format(new Date(booking.slot.start))}{' '}
                    UTC
                  </p>
                  <p className="mt-1 text-body-sm">
                    <a
                      href={`mailto:${booking.email}`}
                      className="text-purple underline underline-offset-2"
                    >
                      {booking.email}
                    </a>
                    {booking.company ? (
                      <span className="text-ink-muted"> · {booking.company}</span>
                    ) : null}
                  </p>
                  {booking.message ? (
                    <p className="mt-3 max-w-180 text-body-sm whitespace-pre-wrap text-ink-muted">
                      {booking.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {booking.status === 'confirmed' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onStatus(booking.id, 'completed')}
                        className="min-h-10 rounded-md border border-line px-3 text-caption font-bold hover:bg-cloud"
                      >
                        {words.complete}
                      </button>
                      <button
                        type="button"
                        onClick={() => onStatus(booking.id, 'cancelled')}
                        className="min-h-10 rounded-md border border-red-text px-3 text-caption font-bold text-red-text hover:bg-red-text/5"
                      >
                        {words.cancel}
                      </button>
                    </>
                  ) : booking.status === 'cancelled' ? (
                    <button
                      type="button"
                      onClick={() => onStatus(booking.id, 'confirmed')}
                      className="min-h-10 rounded-md border border-line px-3 text-caption font-bold hover:bg-cloud"
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
        <p className="rounded-xl border border-dashed border-line bg-white p-8 text-body-sm text-ink-muted">
          {bookings.length ? words.noBookings : words.empty}
        </p>
      )}
    </div>
  );
}
