import { bookingConfig } from './config';
import type { BookingService } from './service';
import type { BookingDay, BookingSlot } from './types';

/**
 * MOCK booking service for the frontend. Replace with a real implementation (see README.md).
 * - Availability: the next `days` weekdays starting tomorrow, slots at `slotTimes`, each
 *   `durationMinutes` long. A few fixed slots are unavailable to show that state.
 * - createBooking: waits ~800ms, then succeeds. A filled honeypot gets a silent fake success; the
 *   email fail@example.com returns an error (to test the error state).
 */

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Date parts (year, month, day, weekday) of an instant in a time zone. */
function zonedParts(date: Date, timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    weekday: parts.weekday,
  };
}

/** The UTC instant of a wall-clock time in a time zone (handles DST via the zone's offset). */
function zonedTimeToUtc(year: number, month: number, day: number, time: string, timeZone: string) {
  const [hour, minute] = time.split(':').map(Number);
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const seen = zonedParts(new Date(guess), timeZone);
  const offset = Date.UTC(seen.year, seen.month - 1, seen.day, seen.hour, seen.minute) - guess;
  return new Date(guess - offset);
}

/** Slots handed out by getAvailability, so createBooking can look them up (as a backend would). */
const knownSlots = new Map<string, BookingSlot>();

/** Fixed "already booked" slots: [day index, slot index]. */
const UNAVAILABLE: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [2, 3],
  [3, 0],
];

export const mockBookingService: BookingService = {
  async getAvailability({ from, days, timeZone }) {
    await delay(400);
    const result: BookingDay[] = [];
    const today = zonedParts(from, timeZone);
    // Walk forward from tomorrow, skipping weekends.
    for (let offset = 1; result.length < days && offset < days * 3; offset++) {
      const noon = new Date(Date.UTC(today.year, today.month - 1, today.day + offset, 12));
      const { year, month, day, weekday } = zonedParts(noon, 'UTC');
      if (weekday === 'Sat' || weekday === 'Sun') continue;

      const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayIndex = result.length;
      const slots: BookingSlot[] = bookingConfig.slotTimes.map((time, slotIndex) => {
        const start = zonedTimeToUtc(year, month, day, time, timeZone);
        const end = new Date(start.getTime() + bookingConfig.durationMinutes * 60_000);
        return {
          id: `${date}T${time}`,
          start: start.toISOString(),
          end: end.toISOString(),
          available: !UNAVAILABLE.some(([d, s]) => d === dayIndex && s === slotIndex),
        };
      });
      slots.forEach((slot) => knownSlots.set(slot.id, slot));
      result.push({ date, slots });
    }
    return result;
  },

  async createBooking(request) {
    await delay(800);
    const slot = knownSlots.get(request.slotId);
    if (!slot || !slot.available) return { ok: false, error: 'slot_unavailable' };
    // Honeypot filled: pretend it worked, so bots learn nothing.
    if (request.website) {
      return { ok: true, booking: { id: 'mock-ignored', slot, email: request.email } };
    }
    if (request.email.trim().toLowerCase() === 'fail@example.com') {
      return { ok: false, error: 'server' };
    }
    return {
      ok: true,
      booking: { id: `mock-${Date.now().toString(36)}`, slot, email: request.email },
    };
  },
};
