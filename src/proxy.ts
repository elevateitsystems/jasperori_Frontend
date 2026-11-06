import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

import { isSupportSlug } from './content/shared';
import { routing } from './i18n/routing';

const handleI18n = createMiddleware(routing);

/** /{locale}/support/{slug} */
const supportPage = new RegExp(`^/(${routing.locales.join('|')})/support/([^/]+)/?$`);

/**
 * Next.js 16 Proxy (formerly middleware.ts).
 * - next-intl: adds the locale prefix to URLs without one (/ -> /sv or /en based on cookie or
 *   browser language) and keeps the NEXT_LOCALE cookie.
 * - Unknown support slugs: with Cache Components + Partial Prefetching, unlisted params are served
 *   from a prerendered shell that has already started with status 200, so notFound() in the page
 *   can show the 404 page but not set the status. Rewriting to a path that only the catch-all route
 *   matches renders the same localized 404 page with a real 404 status. The URL stays unchanged.
 */
export default function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(supportPage);
  if (match && !isSupportSlug(match[2])) {
    return NextResponse.rewrite(new URL(`/${match[1]}/support/${match[2]}/not-found`, request.url));
  }
  return handleI18n(request);
}

export const config = {
  // Everything except API routes, Next.js internals and files with an extension (images, favicon).
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
