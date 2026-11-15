'use client';

import { useActionState } from 'react';

import { loginAdmin, type LoginState } from '@/app/[locale]/admin/actions';
import type { Locale } from '@/i18n/routing';

const initialState: LoginState = {};

const copy = {
  en: {
    title: 'Admin sign in',
    description: 'Sign in to manage TechSalem website content and bookings.',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signingIn: 'Signing in…',
    invalid: 'Email or password is incorrect.',
    limited: 'Too many attempts. Wait a few minutes and try again.',
    unavailable:
      'The admin account is not set up yet. Add ADMIN_EMAIL and ADMIN_PASSWORD to the server environment.',
    hint: 'Use the admin email and password set up for this website.',
  },
  sv: {
    title: 'Admininloggning',
    description: 'Logga in för att hantera TechSalems webbplatsinnehåll och bokningar.',
    email: 'E-post',
    password: 'Lösenord',
    signIn: 'Logga in',
    signingIn: 'Loggar in…',
    invalid: 'E-postadressen eller lösenordet är fel.',
    limited: 'För många försök. Vänta några minuter och försök igen.',
    unavailable:
      'Adminkontot är inte skapat ännu. Lägg till ADMIN_EMAIL och ADMIN_PASSWORD i serverns miljö.',
    hint: 'Använd e-postadressen och lösenordet som är inställt för den här webbplatsen.',
  },
} as const;

export function AdminLogin({ locale }: { locale: Locale }) {
  const words = copy[locale];
  const [state, action, pending] = useActionState(loginAdmin, initialState);
  const error =
    state.error === 'invalid'
      ? words.invalid
      : state.error === 'limited'
        ? words.limited
        : state.error === 'unavailable'
          ? words.unavailable
          : '';

  return (
    <section data-admin-shell className="grid min-h-dvh place-items-center bg-cloud px-4 py-10">
      <div className="w-full max-w-[420px]">
        <p className="mb-6 text-center text-title-18 font-extrabold tracking-tight text-navy">
          TechSalem
        </p>
        <section className="shadow-sm rounded-xl border border-line bg-white p-6 sm:p-8">
          <h1 className="text-title-24 font-extrabold tracking-tight text-zinc-950">
            {words.title}
          </h1>
          <p className="mt-2 text-body-sm text-ink-muted">{words.description}</p>
          <form action={action} className="mt-6 grid gap-4">
            <input type="hidden" name="locale" value={locale} />
            <label className="grid gap-2 text-body-sm font-semibold text-zinc-950">
              {words.email}
              <input
                type="email"
                name="email"
                autoComplete="username"
                required
                className="min-h-11 rounded-md border border-line px-3 font-normal outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
            <label className="grid gap-2 text-body-sm font-semibold text-zinc-950">
              {words.password}
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="min-h-11 rounded-md border border-line px-3 font-normal outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
            {error ? (
              <p
                role="alert"
                className="rounded-md bg-red-text/10 px-3 py-2 text-body-sm text-red-text"
              >
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="min-h-11 rounded-md bg-navy px-4 text-button text-white hover:bg-navy-dark disabled:opacity-60"
            >
              {pending ? words.signingIn : words.signIn}
            </button>
            <p className="text-caption leading-relaxed text-ink-muted">{words.hint}</p>
          </form>
        </section>
      </div>
    </section>
  );
}
