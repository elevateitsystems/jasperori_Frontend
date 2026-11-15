import 'server-only';

import { prisma } from '@/lib/db/prisma';

/** True when this bucket is still under the limit. A failed check is still counted. */
export async function allowRequest(
  bucket: string,
  limit: number,
  windowMinutes: number,
): Promise<boolean> {
  const since = new Date(Date.now() - windowMinutes * 60 * 1000);
  const recent = await prisma.rateLimit.count({
    where: { bucket, createdAt: { gte: since } },
  });
  await prisma.rateLimit.create({ data: { bucket } });
  return recent < limit;
}
