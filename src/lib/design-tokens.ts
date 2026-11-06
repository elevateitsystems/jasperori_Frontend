/**
 * Names of the custom design tokens defined in src/app/globals.css.
 *
 * Values live only in globals.css. This file lists the names so cn() can merge the custom
 * classes correctly, and so the dev tokens page can show them. Keep both files in sync.
 *
 * Class names are written out in full (not built from strings) so Tailwind can find them.
 */

export const colorTokens = [
  { name: 'navy', className: 'bg-navy' },
  { name: 'navy-dark', className: 'bg-navy-dark' },
  { name: 'purple', className: 'bg-purple' },
  { name: 'red', className: 'bg-red' },
  { name: 'charcoal', className: 'bg-charcoal' },
  { name: 'zinc-950', className: 'bg-zinc-950' },
  { name: 'ink-muted', className: 'bg-ink-muted' },
  { name: 'ink-soft', className: 'bg-ink-soft' },
  { name: 'cloud', className: 'bg-cloud' },
  { name: 'lavender', className: 'bg-lavender' },
  { name: 'line', className: 'bg-line' },
  { name: 'white', className: 'bg-white' },
  { name: 'black', className: 'bg-black' },
] as const;

export const gradientTokens = [
  { name: 'overlay-home-hero', className: 'bg-overlay-home-hero' },
  { name: 'overlay-hero-about', className: 'bg-overlay-hero-about' },
  { name: 'overlay-hero-services', className: 'bg-overlay-hero-services' },
  { name: 'overlay-hero-support', className: 'bg-overlay-hero-support' },
  { name: 'accent-bar', className: 'bg-accent-bar' },
  { name: 'brand', className: 'bg-brand' },
  { name: 'overlay-image-text', className: 'bg-overlay-image-text' },
  { name: 'overlay-about-quote', className: 'bg-overlay-about-quote' },
] as const;

/** `inter: true` means the style is meant to be used together with `font-inter`. */
export const textStyleTokens = [
  { name: 'watermark', className: 'text-watermark', inter: false },
  { name: 'display', className: 'text-display', inter: false },
  { name: 'display-md', className: 'text-display-md', inter: false },
  { name: 'hero-home', className: 'text-hero-home', inter: false },
  { name: 'h2-xl', className: 'text-h2-xl', inter: false },
  { name: 'h2-xl-snug', className: 'text-h2-xl-snug', inter: false },
  { name: 'h2-xl-tight', className: 'text-h2-xl-tight', inter: false },
  { name: 'h2-xl-none', className: 'text-h2-xl-none', inter: false },
  { name: 'h2', className: 'text-h2', inter: false },
  { name: 'h2-snug', className: 'text-h2-snug', inter: false },
  { name: 'quote', className: 'text-quote', inter: false },
  { name: 'h3-lg', className: 'text-h3-lg', inter: false },
  { name: 'h3-lg-relaxed', className: 'text-h3-lg-relaxed', inter: false },
  { name: 'h3', className: 'text-h3', inter: false },
  { name: 'lead', className: 'text-lead', inter: false },
  { name: 'lead-sm', className: 'text-lead-sm', inter: false },
  { name: 'title-24', className: 'text-title-24', inter: false },
  { name: 'title-20', className: 'text-title-20', inter: false },
  { name: 'logo', className: 'text-logo', inter: false },
  { name: 'title-18', className: 'text-title-18', inter: false },
  { name: 'title-16', className: 'text-title-16', inter: false },
  { name: 'body-lg', className: 'text-body-lg', inter: false },
  { name: 'body', className: 'text-body', inter: false },
  { name: 'body-loose', className: 'text-body-loose', inter: false },
  { name: 'body-sm', className: 'text-body-sm', inter: false },
  { name: 'body-sm-relaxed', className: 'text-body-sm-relaxed', inter: false },
  { name: 'body-sm-loose', className: 'text-body-sm-loose', inter: false },
  { name: 'nav', className: 'text-nav', inter: false },
  { name: 'button', className: 'text-button', inter: false },
  { name: 'eyebrow', className: 'text-eyebrow', inter: false },
  { name: 'caption', className: 'text-caption', inter: false },
  { name: 'lang', className: 'text-lang', inter: false },
  { name: 'micro', className: 'text-micro', inter: false },
  { name: 'inter-h2', className: 'text-inter-h2', inter: true },
  { name: 'inter-title', className: 'text-inter-title', inter: true },
  { name: 'inter-lead', className: 'text-inter-lead', inter: true },
  { name: 'inter-body', className: 'text-inter-body', inter: true },
  { name: 'inter-label', className: 'text-inter-label', inter: true },
  { name: 'inter-eyebrow', className: 'text-inter-eyebrow', inter: true },
  { name: 'inter-caption', className: 'text-inter-caption', inter: true },
] as const;

export const radiusTokens = [
  { name: 'sm', className: 'rounded-sm' },
  { name: 'md', className: 'rounded-md' },
  { name: 'lg', className: 'rounded-lg' },
  { name: 'xl', className: 'rounded-xl' },
  { name: '2xl', className: 'rounded-2xl' },
  { name: 'full', className: 'rounded-full' },
] as const;

export const shadowTokens = [
  { name: 'switch', className: 'shadow-switch' },
  { name: 'glow', className: 'shadow-glow' },
  { name: 'cta', className: 'shadow-cta' },
] as const;

export const trackingTokens = [
  'tight-5',
  'tight-6',
  'caps-12',
  'caps-13',
  'caps-15',
  'caps-16',
  'caps-18',
  'caps-20',
  'caps-22',
  'caps-24',
] as const;
