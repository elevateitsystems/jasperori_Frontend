import { Inter, Manrope } from 'next/font/google';

/** Manrope: the site font. Exposed as --next-font-manrope and used by `font-sans`. */
export const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
  variable: '--next-font-manrope',
});

/**
 * Inter: only for the Home "Services" and "About TechSalem" sections (`font-inter`).
 * Not preloaded, because most pages never use it.
 */
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--next-font-inter',
  preload: false,
});

/** Class names that define both font variables. Put them on <html>. */
export const fontVariables = `${manrope.variable} ${inter.variable}`;
