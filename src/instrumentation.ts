/**
 * Opens the database when the Node.js server starts, so the first page is not also the first migration.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ensureAdmin } = await import('@/lib/auth/session');
    await ensureAdmin();
  }
}
