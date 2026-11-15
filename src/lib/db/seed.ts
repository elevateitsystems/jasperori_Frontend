import 'server-only';

import { contentJson, contentKeys, defaultContent } from '@/lib/db/defaults';
import { prisma } from '@/lib/db/prisma';

let seeded: Promise<void> | null = null;

/** Insert the typed content files the first time the database is empty. Later edits stay. */
export function seedContent(): Promise<void> {
  seeded ??= seedContentOnce();
  return seeded;
}

async function seedContentOnce(): Promise<void> {
  const existing = await prisma.contentDocument.count();
  if (existing > 0) return;

  await prisma.contentDocument.createMany({
    data: (['sv', 'en'] as const).flatMap((locale) =>
      contentKeys.map((key) => ({
        locale,
        key,
        data: contentJson(defaultContent[locale][key]),
      })),
    ),
  });
}
