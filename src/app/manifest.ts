import type { MetadataRoute } from 'next';

/**
 * Web app manifest. Colors come from the design tokens: navy #17233F (theme) and white.
 * TODO (handoff): the name is the same in both languages, so it is not in the content files.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TechSalem',
    short_name: 'TechSalem',
    start_url: '/',
    display: 'standalone',
    theme_color: '#17233F',
    background_color: '#FFFFFF',
    icons: [{ src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' }],
  };
}
