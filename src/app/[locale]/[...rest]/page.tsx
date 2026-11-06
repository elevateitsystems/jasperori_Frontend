import { notFound } from 'next/navigation';

/**
 * Catches every unknown path under a locale (e.g. /en/unknown) so it renders the localized
 * [locale]/not-found.tsx inside the site layout instead of Next.js' default 404.
 */
export default function CatchAllPage() {
  notFound();
}
