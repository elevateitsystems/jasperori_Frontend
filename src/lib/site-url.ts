/**
 * Public URL of the site, used to build absolute URLs (e.g. Open Graph images).
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. https://www.example.se).
 * TODO: confirm the production domain with the client.
 */
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
