import { randomBytes } from 'node:crypto';

import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db/prisma';
import type {
  BookingDay,
  BookingRecord,
  BookingRequest,
  BookingResult,
  BookingSlot,
  BookingStatus,
} from '@/lib/booking/types';

import { bookingConfig } from './config';
import { upcomingWeekdays, zonedTimeToUtc } from './time';

function isUniqueError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
}

async function takenSlotIds(): Promise<Set<string>> {
  const rows = await prisma.booking.findMany({
    where: { openSlotId: { not: null } },
    select: { openSlotId: true },
  });
  return new Set(rows.flatMap((row) => (row.openSlotId ? [row.openSlotId] : [])));
}

/** The bookable grid from tomorrow, with slots that already have a booking marked unavailable. */
export async function getBookingAvailability(from = new Date()): Promise<BookingDay[]> {
  const taken = await takenSlotIds();
  const { timeZone, days, slotTimes, durationMinutes } = bookingConfig;

  return upcomingWeekdays(from, days, timeZone).map(({ year, month, day, date }) => ({
    date,
    slots: slotTimes.map((time) => {
      const start = zonedTimeToUtc(year, month, day, time, timeZone);
      const end = new Date(start.getTime() + durationMinutes * 60_000);
      const id = `${date}T${time}`;
      const slot: BookingSlot = {
        id,
        start: start.toISOString(),
        end: end.toISOString(),
        available: !taken.has(id),
      };
      return slot;
    }),
  }));
}

export async function findOpenSlot(
  slotId: string,
  from = new Date(),
): Promise<BookingSlot | undefined> {
  for (const day of await getBookingAvailability(from)) {
    const slot = day.slots.find((item) => item.id === slotId);
    if (slot) return slot;
  }
  return undefined;
}

/** Books a slot that is still inside the published grid and not already taken. */
export async function createBookingRecord(request: BookingRequest): Promise<BookingResult> {
  const slot = await findOpenSlot(request.slotId);
  if (!slot || !slot.available) return { ok: false, error: 'slot_unavailable' };

  const id = `BK-${randomBytes(4).toString('hex').toUpperCase()}`;
  try {
    await prisma.booking.create({
      data: {
        id,
        slotId: slot.id,
        openSlotId: slot.id,
        slotStart: new Date(slot.start),
        slotEnd: new Date(slot.end),
        name: request.name,
        email: request.email,
        company: request.company ?? '',
        message: request.message ?? '',
        locale: request.locale,
      },
    });
  } catch (error) {
    if (isUniqueError(error)) return { ok: false, error: 'slot_unavailable' };
    throw error;
  }

  return { ok: true, booking: { id, slot: { ...slot, available: false }, email: request.email } };
}

function toRecord(row: {
  id: string;
  slotId: string;
  slotStart: Date;
  slotEnd: Date;
  name: string;
  email: string;
  company: string;
  message: string;
  locale: BookingRecord['locale'];
  status: BookingStatus;
  createdAt: Date;
}): BookingRecord {
  return {
    id: row.id,
    slotId: row.slotId,
    slot: {
      id: row.slotId,
      start: row.slotStart.toISOString(),
      end: row.slotEnd.toISOString(),
      available: false,
    },
    name: row.name,
    email: row.email,
    company: row.company,
    message: row.message,
    locale: row.locale,
    createdAt: row.createdAt.toISOString(),
    status: row.status,
  };
}

export async function listBookings(): Promise<BookingRecord[]> {
  const rows = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map(toRecord);
}

export async function setBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<'ok' | 'missing' | 'conflict'> {
  const current = await prisma.booking.findUnique({
    where: { id },
    select: { slotId: true },
  });
  if (!current) return 'missing';

  const openSlotId = status === 'cancelled' ? null : current.slotId;
  if (openSlotId) {
    const other = await prisma.booking.findFirst({
      where: { openSlotId, NOT: { id } },
      select: { id: true },
    });
    if (other) return 'conflict';
  }

  try {
    await prisma.booking.update({ where: { id }, data: { status, openSlotId } });
  } catch (error) {
    if (isUniqueError(error)) return 'conflict';
    throw error;
  }
  return 'ok';
}
