import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/**
 * Locale-aware versions of Next.js navigation APIs. Use these instead of next/link and
 * next/navigation so links keep the active locale. To switch language on the same page:
 * `router.replace(pathname, { locale: 'en' })` with `usePathname()` and `useRouter()`.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
