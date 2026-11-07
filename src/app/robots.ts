import type { MetadataRoute } from 'next';

import { isProduction, siteUrl } from '@/lib/site-env';

/** Production: allow everything and point to the sitemap. Everything else: disallow all. */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  };
}
