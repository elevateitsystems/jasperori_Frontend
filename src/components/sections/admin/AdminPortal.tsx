'use client';

import { useEffect, useState, type FormEvent } from 'react';

import type { Locale } from '@/i18n/routing';
import { mockAdminAuth } from '@/lib/admin/auth';
import { AdminPanel } from './AdminPanel';

const sessionKey = 'techsalem.admin.session.v1';
const mockAdminEmail = 'admin@techsalem.se';

const copy = {
  en: {
    title: 'Admin sign in',
    description: 'Sign in to manage TechSalem website content and bookings.',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    forgot: 'Forgot Password?',
    forgotTitle: 'Reset your password',
    forgotDescription: 'Enter your admin email and we will send reset instructions.',
    send: 'Send reset instructions',
    back: 'Back to login',
    resetSent: 'Reset instructions sent to your email.',
    resetNote: 'Mock workflow: no email is sent until an email service is connected.',
    invalid: 'Email or password is incorrect.',
    demo: 'Mock login: admin@techsalem.se / techsalem2026',
    mock: 'This demo login is for frontend preview only.',
    loggingIn: 'Checking session…',
    logout: 'Log out',
  },
  sv: {
    title: 'Admininloggning',
    description: 'Logga in för att hantera TechSalems webbplatsinnehåll och bokningar.',
    email: 'E-post',
    password: 'Lösenord',
    signIn: 'Logga in',
    forgot: 'Glömt lösenordet?',
    forgotTitle: 'Återställ lösenordet',
    forgotDescription: 'Ange din admin-e-post så skickar vi instruktioner för återställning.',
    send: 'Skicka instruktioner',
    back: 'Tillbaka till inloggning',
    resetSent: 'Instruktioner för återställning har skickats till din e-post.',
    resetNote: 'Demoflöde: inget mejl skickas innan en e-posttjänst har anslutits.',
    invalid: 'E-postadressen eller lösenordet är fel.',
    demo: 'Demo: admin@techsalem.se / techsalem2026',
    mock: 'Demoinloggningen är endast för förhandsvisning av gränssnittet.',
    loggingIn: 'Kontrollerar session…',
    logout: 'Logga ut',
  },
} as const;

export function AdminPortal({
  defaultLocale,
  initialContent,
}: {
  defaultLocale: Locale;
  initialContent: Record<Locale, Record<string, unknown>>;
}) {
  const words = copy[defaultLocale];
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem(sessionKey) === mockAdminEmail);
    setReady(true);
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!(await mockAdminAuth.signIn({ email, password }))) {
      setError(words.invalid);
      return;
    }
    sessionStorage.setItem(sessionKey, mockAdminEmail);
    setAuthenticated(true);
  }

  async function sendReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await mockAdminAuth.requestPasswordReset(email)) setSuccess(words.resetSent);
  }

  function backToLogin() {
    setView('login');
    setSuccess('');
    setError('');
  }

  function signOut() {
    sessionStorage.removeItem(sessionKey);
    setAuthenticated(false);
    setView('login');
    setPassword('');
    setSuccess('');
  }

  if (!ready) {
    return (
      <div className="min-h-[70vh] bg-cloud" aria-live="polite">
        {words.loggingIn}
      </div>
    );
  }

  if (authenticated) {
    return (
      <AdminPanel
        defaultLocale={defaultLocale}
        initialContent={initialContent}
        onLogout={signOut}
      />
    );
  }

  return (
    <section className="grid min-h-[70vh] place-items-center bg-cloud px-5 py-12">
      <section className="shadow-sm w-full max-w-md rounded-sm border border-line bg-white p-6 sm:p-8">
        <h1 className="text-h2 text-zinc-950">
          {view === 'login' ? words.title : words.forgotTitle}
        </h1>
        <p className="mt-2 text-body-sm text-ink-muted">
          {view === 'login' ? words.description : words.forgotDescription}
        </p>

        {view === 'login' ? (
          <form onSubmit={signIn} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-body-sm font-semibold text-zinc-950">
              {words.email}
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-11 rounded-sm border border-line px-3 font-normal outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
            <label className="grid gap-2 text-body-sm font-semibold text-zinc-950">
              {words.password}
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-h-11 rounded-sm border border-line px-3 font-normal outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
            {error ? (
              <p role="alert" className="text-body-sm text-red-text">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="min-h-11 rounded-sm bg-navy px-4 text-button text-white hover:bg-navy-dark"
            >
              {words.signIn}
            </button>
            <button
              type="button"
              onClick={() => {
                setView('forgot');
                setError('');
                setSuccess('');
              }}
              className="w-fit text-body-sm font-semibold text-purple underline underline-offset-4"
            >
              {words.forgot}
            </button>
            <div className="mt-2 rounded-sm bg-cloud p-3 text-caption leading-relaxed text-ink-muted">
              <p className="font-semibold text-zinc-950">{words.demo}</p>
              <p className="mt-1">{words.mock}</p>
            </div>
          </form>
        ) : (
          <form onSubmit={sendReset} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-body-sm font-semibold text-zinc-950">
              {words.email}
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSuccess('');
                }}
                className="min-h-11 rounded-sm border border-line px-3 font-normal outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
              />
            </label>
            {success ? (
              <div
                role="status"
                className="border-green-200 bg-green-50 text-green-800 rounded-sm border p-3 text-body-sm"
              >
                <p className="font-semibold">{success}</p>
                <p className="mt-1 text-caption">{words.resetNote}</p>
              </div>
            ) : null}
            <button
              type="submit"
              className="min-h-11 rounded-sm bg-navy px-4 text-button text-white hover:bg-navy-dark"
            >
              {words.send}
            </button>
            <button
              type="button"
              onClick={backToLogin}
              className="w-fit text-body-sm font-semibold text-purple underline underline-offset-4"
            >
              {words.back}
            </button>
          </form>
        )}
      </section>
    </section>
  );
}
