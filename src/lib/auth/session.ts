import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { connection } from 'next/server';

import { hashPassword } from '@/lib/auth/password';
import { prisma } from '@/lib/db/prisma';
import { seedContent } from '@/lib/db/seed';

const COOKIE = 'techsalem_admin';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

export interface AdminSession {
  id: string;
  email: string;
}

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Creates the first admin from ADMIN_EMAIL and ADMIN_PASSWORD when the table is empty.
 * Later changes to those variables do not overwrite an account that already exists.
 */
export async function ensureAdmin() {
  await seedContent();
  const existing = await prisma.admin.findFirst({ select: { id: true } });
  if (existing) return;

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!email || !password || password.length < 8) {
    console.warn(
      'No admin account exists. Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 8 characters) in .env.',
    );
    return;
  }

  await prisma.admin.create({
    data: { email, passwordHash: await hashPassword(password) },
  });
}

export async function findAdminByEmail(email: string) {
  return prisma.admin.findUnique({
    where: { email },
    select: { id: true, email: true, passwordHash: true },
  });
}

export async function adminExists() {
  const row = await prisma.admin.findFirst({ select: { id: true } });
  return row !== null;
}

export async function createSession(adminId: string) {
  const token = randomBytes(32).toString('base64url');
  await prisma.session.create({
    data: {
      adminId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + MAX_AGE_SECONDS * 1000),
    },
  });

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  await connection();
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  const now = new Date();
  await prisma.session.deleteMany({ where: { expiresAt: { lte: now } } });
  const row = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { admin: { select: { id: true, email: true } } },
  });
  if (!row || row.expiresAt <= now) return null;
  return row.admin;
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  jar.delete(COOKIE);
}
