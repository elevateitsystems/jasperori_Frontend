'use client';

import { useLocale } from 'next-intl';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';

import { intlLocales } from '@/i18n/intl';
import { Link } from '@/i18n/navigation';
import { bookingConfig } from '@/lib/booking/config';
import { bookingFormSchema, type BookingFormField } from '@/lib/booking/schema';
import { bookingService } from '@/lib/booking/service';
import type { BookingDay, BookingSlot } from '@/lib/booking/types';
import { cn } from '@/lib/cn';
import { fillTemplate } from '@/lib/format';
import type { BookingFormContent } from '@/types/content';

type Values = Record<BookingFormField | 'website', string>;
type Errors = Partial<Record<BookingFormField, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_VALUES: Values = {
  slotId: '',
  name: '',
  email: '',
  company: '',
  message: '',
  website: '',
};

/** Availability for the configured number of days, in the display time zone. */
const loadAvailability = () =>
  bookingService.getAvailability({
    from: new Date(),
    days: bookingConfig.days,
    timeZone: bookingConfig.timeZone,
  });

/** Order used to move focus to the first invalid field. */
const FIELD_ORDER: BookingFormField[] = ['slotId', 'name', 'email', 'company', 'message'];

interface BookingFormProps {
  content: BookingFormContent;
  /** Site email (from the site settings) for the error and empty messages. */
  siteEmail: string;
}

/** Text with "{email}" replaced by a mailto link. */
function WithEmailLink({ template, email }: { template: string; email: string }) {
  const [before, after = ''] = template.split('{email}');
  return (
    <>
      {before}
      <a href={`mailto:${email}`} className="underline underline-offset-2">
        {email}
      </a>
      {after}
    </>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Label (Bold 12/16 uppercase), 8px, control, then the error message (Regular 12/16, red). */
function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-eyebrow font-bold tracking-caps-12 text-zinc-950">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-caption text-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClasses =
  'block w-full border border-navy/15 bg-white px-4 text-body text-zinc-950 transition-colors focus:border-navy aria-invalid:border-red';

/**
 * Booking form (client). Loads availability from the booking service, validates with the shared
 * zod schema (on submit, and on blur for fields that were touched), and sends the request.
 * Slots are a native radio group (arrow keys move within it), one fieldset per day.
 */
export function BookingForm({ content, siteEmail }: BookingFormProps) {
  const locale = useLocale();
  const intlLocale = intlLocales[locale];
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const boxRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const [days, setDays] = useState<BookingDay[] | null>(null);
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<ReadonlySet<BookingFormField>>(new Set());
  const [status, setStatus] = useState<Status>('idle');
  const [booked, setBooked] = useState<{ email: string; slot: BookingSlot } | null>(null);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    let active = true;
    loadAvailability().then((result) => {
      if (active) setDays(result);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  // --- Formatting (dates in the display time zone, labels in the page language) ---
  /** "YYYY-MM-DD" (a calendar date) formatted with Intl, e.g. "Thu 5 Nov" / "tors 5 nov.". */
  const formatDate = (date: string, options: Intl.DateTimeFormatOptions) => {
    const [year, month, day] = date.split('-').map(Number);
    return new Intl.DateTimeFormat(intlLocale, { ...options, timeZone: 'UTC' }).format(
      new Date(Date.UTC(year, month - 1, day, 12)),
    );
  };
  const formatTime = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: bookingConfig.timeZone,
    }).format(new Date(iso));
  const formatDateLong = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: bookingConfig.timeZone,
    }).format(new Date(iso));

  // --- Validation ---
  const validate = (current: Values): Errors => {
    const parsed = bookingFormSchema.safeParse({
      slotId: current.slotId,
      name: current.name,
      email: current.email.trim(),
      company: current.company || undefined,
      message: current.message || undefined,
    });
    if (parsed.success) return {};
    const result: Errors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as BookingFormField;
      if (result[field]) continue;
      if (issue.code === 'too_big') result[field] = content.errors.tooLong;
      else if (field === 'slotId') result[field] = content.errors.slot;
      else if (field === 'name') result[field] = content.errors.name;
      else if (field === 'email') result[field] = content.errors.email;
      else result[field] = content.errors.tooLong;
    }
    return result;
  };

  const updateFieldError = (field: BookingFormField, current: Values) =>
    setErrors((previous) => ({ ...previous, [field]: validate(current)[field] }));

  const onChange =
    (field: BookingFormField | 'website') =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      // Clear (or update) an error as soon as the user fixes a field that already showed one.
      if (field !== 'website' && errors[field]) updateFieldError(field, next);
    };

  const onBlur = (field: BookingFormField) => () => {
    setTouched((previous) => new Set(previous).add(field));
    if (touched.has(field) || values[field]) updateFieldError(field, values);
  };

  const focusField = (field: BookingFormField) => {
    const form = formRef.current;
    if (!form) return;
    const target =
      field === 'slotId'
        ? form.querySelector<HTMLInputElement>('input[name="slot"]:not(:disabled)')
        : form.querySelector<HTMLElement>(`#${CSS.escape(id(field))}`);
    target?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const found = validate(values);
    setErrors(found);
    setTouched(new Set(FIELD_ORDER));
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    setStatus('submitting');
    setAnnouncement('');
    const result = await bookingService.createBooking({
      slotId: values.slotId,
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim() || undefined,
      message: values.message.trim() || undefined,
      locale,
      website: values.website,
    });

    if (result.ok) {
      const { slot, email } = result.booking;
      setBooked({ slot, email });
      setStatus('success');
      setAnnouncement(
        `${content.success.title} ${fillTemplate(content.success.text, {
          email,
          date: formatDateLong(slot.start),
          time: formatTime(slot.start),
        })}`,
      );
    } else {
      setStatus('error');
      setAnnouncement(fillTemplate(content.errors.submit, { email: siteEmail }));
    }
  };

  const reset = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setTouched(new Set());
    setBooked(null);
    setStatus('idle');
    setAnnouncement('');
    setDays(null);
    loadAvailability().then(setDays);
    boxRef.current?.focus();
  };

  const describedBy = (field: BookingFormField) =>
    errors[field] ? `${id(field)}-error` : undefined;
  const hasAvailable = days?.some((day) => day.slots.some((slot) => slot.available)) ?? false;
  const submitting = status === 'submitting';

  return (
    <div ref={boxRef} tabIndex={-1} className="bg-cloud p-6 outline-none md:p-10">
      {/* One live region for the success and error messages. */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {status === 'success' && booked ? (
        <div>
          <h3
            ref={successRef}
            tabIndex={-1}
            className="text-title-24 font-extrabold text-navy outline-none"
          >
            {content.success.title}
          </h3>
          <p className="mt-3 text-body text-ink-muted">
            {fillTemplate(content.success.text, {
              email: booked.email,
              date: formatDateLong(booked.slot.start),
              time: formatTime(booked.slot.start),
            })}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 text-button text-purple underline underline-offset-4 hover:text-navy"
          >
            {content.success.again}
          </button>
        </div>
      ) : (
        <form ref={formRef} noValidate onSubmit={onSubmit} className="relative">
          <p id={id('slots-label')} className="text-micro font-bold text-purple">
            {content.slotsLabel}
          </p>

          <div className="mt-7">
            {days === null ? (
              <div
                aria-busy="true"
                className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-x-[8.5px]"
              >
                <span className="sr-only" role="status">
                  {content.loading}
                </span>
                {Array.from({ length: bookingConfig.days }, (_, index) => (
                  <div
                    key={index}
                    aria-hidden="true"
                    className="h-54.75 animate-pulse border border-navy/10 bg-white motion-reduce:animate-none"
                  />
                ))}
              </div>
            ) : !hasAvailable ? (
              <p className="text-body text-ink-muted">
                <WithEmailLink template={content.empty} email={siteEmail} />
              </p>
            ) : (
              <div
                role="group"
                aria-labelledby={id('slots-label')}
                aria-describedby={describedBy('slotId')}
                className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-x-[8.5px]"
              >
                {days.map((day) => (
                  <fieldset key={day.date} className="min-w-0 border border-navy/10 bg-white p-2">
                    <legend className="float-left w-full text-center text-micro font-bold tracking-normal text-ink-muted normal-case">
                      {formatDate(day.date, { weekday: 'short', day: 'numeric', month: 'short' })}
                    </legend>
                    <div className="clear-left grid gap-1.5 pt-2">
                      {day.slots.map((slot) => {
                        const label = fillTemplate(content.slotAria, {
                          weekday: formatDate(day.date, { weekday: 'long' }),
                          date: formatDate(day.date, { day: 'numeric', month: 'long' }),
                          time: formatTime(slot.start),
                        });
                        return (
                          <label key={slot.id} className="relative block">
                            <input
                              type="radio"
                              name="slot"
                              value={slot.id}
                              checked={values.slotId === slot.id}
                              disabled={!slot.available}
                              aria-disabled={!slot.available || undefined}
                              aria-label={
                                slot.available ? label : `${label}, ${content.slotUnavailable}`
                              }
                              onChange={() => {
                                setValues((previous) => ({ ...previous, slotId: slot.id }));
                                setErrors((previous) => ({ ...previous, slotId: undefined }));
                              }}
                              className="peer sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className={cn(
                                'flex h-10 items-center justify-center text-caption font-bold transition-colors pointer-coarse:h-11',
                                'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-purple',
                                slot.available
                                  ? 'cursor-pointer bg-cloud text-zinc-950 peer-checked:bg-navy peer-checked:text-white hover:bg-lavender'
                                  : 'cursor-not-allowed text-ink-muted line-through',
                              )}
                            >
                              {formatTime(slot.start)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            )}
            {errors.slotId ? (
              <p id={`${id('slotId')}-error`} className="mt-2 text-caption text-red">
                {errors.slotId}
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-y-4 sm:grid-cols-2 sm:gap-x-3.75">
            <Field id={id('name')} label={content.fields.name} error={errors.name}>
              <input
                id={id('name')}
                type="text"
                autoComplete="name"
                aria-required="true"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy('name')}
                value={values.name}
                onChange={onChange('name')}
                onBlur={onBlur('name')}
                className={cn(inputClasses, 'h-12')}
              />
            </Field>
            <Field id={id('email')} label={content.fields.email} error={errors.email}>
              <input
                id={id('email')}
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy('email')}
                value={values.email}
                onChange={onChange('email')}
                onBlur={onBlur('email')}
                className={cn(inputClasses, 'h-12')}
              />
            </Field>
            <Field
              id={id('company')}
              label={content.fields.company}
              error={errors.company}
              className="sm:col-span-2"
            >
              <input
                id={id('company')}
                type="text"
                autoComplete="organization"
                aria-invalid={errors.company ? true : undefined}
                aria-describedby={describedBy('company')}
                value={values.company}
                onChange={onChange('company')}
                onBlur={onBlur('company')}
                className={cn(inputClasses, 'h-12')}
              />
            </Field>
            <Field
              id={id('message')}
              label={content.fields.message}
              error={errors.message}
              className="sm:col-span-2"
            >
              <textarea
                id={id('message')}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={describedBy('message')}
                value={values.message}
                onChange={onChange('message')}
                onBlur={onBlur('message')}
                className={cn(inputClasses, 'h-28.5 resize-y py-3')}
              />
            </Field>
          </div>

          {/* Honeypot: invisible to people and screen readers; bots fill it in. */}
          <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
            <label htmlFor={id('website')}>{content.honeypotLabel}</label>
            <input
              id={id('website')}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={onChange('website')}
            />
          </div>

          {status === 'error' ? (
            <p className="mt-7 text-caption text-red">
              <WithEmailLink template={content.errors.submit} email={siteEmail} />
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            aria-describedby={values.slotId ? undefined : id('hint')}
            className={cn(
              'mt-7 flex h-14 w-full items-center justify-center bg-navy text-eyebrow tracking-caps-15 text-white transition-opacity hover:bg-navy-dark disabled:cursor-wait',
              (!values.slotId || submitting) && 'opacity-40',
            )}
          >
            {submitting ? content.sending : content.submit}
          </button>
          {values.slotId ? null : (
            <p id={id('hint')} className="sr-only">
              {content.chooseTimeHint}
            </p>
          )}

          <p className="mt-4 text-caption text-ink-muted">
            {content.privacyNote.before}{' '}
            <Link
              href={content.privacyNote.link.href}
              className="underline underline-offset-2 hover:text-purple"
            >
              {content.privacyNote.link.label}
            </Link>
            {content.privacyNote.after}
          </p>
        </form>
      )}
    </div>
  );
}
