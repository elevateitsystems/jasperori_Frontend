import type { SupportSlug } from '@/types/content';

/**
 * Content that is the same in every language.
 *
 * Support page slugs: both languages use the same slugs so the language switch can stay on the
 * same support page (/sv/support/support-02 <-> /en/support/support-02). Edit them here.
 * The first slug is where /[locale]/support redirects to.
 */
export const supportSlugs = ['support-01', 'support-02'] as const;

export function isSupportSlug(value: string): value is SupportSlug {
  return (supportSlugs as readonly string[]).includes(value);
}
