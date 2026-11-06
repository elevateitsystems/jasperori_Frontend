import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import { gradientTokens, shadowTokens, textStyleTokens, trackingTokens } from '@/lib/design-tokens';

/*
 * tailwind-merge only knows Tailwind's default names. Without this config it would read
 * `text-h2` as a text color (and drop it next to `text-navy`) or `shadow-glow` as a shadow color.
 * Colors and radius need no config: any `text-*` / `bg-*` name not listed here is a color, and
 * sm/md/lg/xl/2xl are already known radius names.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: textStyleTokens.map((token) => token.name),
      shadow: shadowTokens.map((token) => token.name),
      tracking: [...trackingTokens],
    },
    classGroups: {
      'bg-image': [{ bg: gradientTokens.map((token) => token.name) }],
    },
  },
});

/** Combine conditional class names and resolve conflicting Tailwind classes. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
