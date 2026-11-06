import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

/**
 * Next.js 16 Proxy (formerly middleware.ts). Adds the locale prefix to URLs without one
 * (/ -> /sv or /en based on cookie or browser language) and keeps the NEXT_LOCALE cookie.
 */
export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next.js internals and files with an extension (images, favicon).
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
