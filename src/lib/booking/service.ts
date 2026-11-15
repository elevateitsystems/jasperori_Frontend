import type { BookingDay, BookingRequest, BookingResult } from './types';

/**
 * The booking API used by the form. The browser calls the Next.js route handlers, which read and
 * write the database. See README.md.
 */
export interface BookingService {
  /** Bookable days from `from` (exclusive of today), `days` weekdays, shown in `timeZone`. */
  getAvailability(params: { from: Date; days: number; timeZone: string }): Promise<BookingDay[]>;
  /** Books a slot. The server re-validates the request and re-checks the slot. */
  createBooking(request: BookingRequest): Promise<BookingResult>;
}

export const bookingService: BookingService = {
  async getAvailability() {
    try {
      const response = await fetch('/api/booking/availability', { cache: 'no-store' });
      if (!response.ok) return [];
      const body: unknown = await response.json();
      return Array.isArray(body) ? (body as BookingDay[]) : [];
    } catch {
      return [];
    }
  },

  async createBooking(request) {
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request),
      });
      const body: unknown = await response.json();
      if (body && typeof body === 'object' && 'ok' in body) return body as BookingResult;
      return { ok: false, error: 'server' };
    } catch {
      return { ok: false, error: 'server' };
    }
  },
};
