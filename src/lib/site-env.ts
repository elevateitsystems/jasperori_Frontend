/**
 * Deployment environment and public site URL. The single place that reads these env vars.
 *
 * - NEXT_PUBLIC_SITE_ENV: 'production' | 'preview' | 'development'.
 *   Only 'production' is indexable. Unset means 'development' while developing and 'preview'
 *   (noindex, the safe choice) in a production build, so a forgotten variable never exposes a test
 *   site to search engines.
 * - NEXT_PUBLIC_SITE_URL: public origin, e.g. https://techsalem.se. Required when the site env is
 *   'production' (next.config.ts stops the build with a clear message when it is missing).
 *   Previews use VERCEL_URL when set, development falls back to http://localhost:3000.
 *
 * Kept free of imports so next.config.ts can reuse `resolveSiteEnv` / `assertProductionEnv`.
 */

export type SiteEnv = 'production' | 'preview' | 'development';

const siteEnvs: readonly string[] = ['production', 'preview', 'development'];

export function resolveSiteEnv(env: Record<string, string | undefined> = process.env): SiteEnv {
  const value = env.NEXT_PUBLIC_SITE_ENV?.trim();
  if (value) {
    if (!siteEnvs.includes(value)) {
      throw new Error(
        `NEXT_PUBLIC_SITE_ENV must be one of ${siteEnvs.join(', ')} (got "${value}"). See .env.example.`,
      );
    }
    return value as SiteEnv;
  }
  return env.NODE_ENV === 'production' ? 'preview' : 'development';
}

/** Throws a clear error when a production deployment has no valid public URL. */
export function assertProductionEnv(env: Record<string, string | undefined> = process.env): void {
  if (resolveSiteEnv(env) !== 'production') return;
  const url = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL is missing. It is required when NEXT_PUBLIC_SITE_ENV=production ' +
        '(canonical URLs, hreflang, Open Graph, sitemap and robots depend on it). ' +
        'Set it to the public origin, e.g. https://techsalem.se. See .env.example.',
    );
  }
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL is not a valid URL ("${url}"). Use e.g. https://techsalem.se.`,
    );
  }
  if (parsed.protocol !== 'https:') {
    throw new Error(`NEXT_PUBLIC_SITE_URL must use https in production (got "${url}").`);
  }
}

function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);
  if (process.env.VERCEL_URL) return new URL(`https://${process.env.VERCEL_URL}`);
  return new URL('http://localhost:3000');
}

assertProductionEnv();

export const siteEnv = resolveSiteEnv();
/** Only the production deployment may be indexed by search engines. */
export const isProduction = siteEnv === 'production';
/** Public origin of this deployment (no trailing path). */
export const siteUrl = resolveSiteUrl();
