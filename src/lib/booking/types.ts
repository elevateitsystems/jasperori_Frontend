/**
 * Booking data shapes, shared by the UI, the mock service and (later) the real backend.
 * See README.md in this folder.
 */

import type { Locale } from '@/i18n/routing';

/** One bookable time. */
export interface BookingSlot {
  /** Stable id the client sends back in BookingRequest.slotId. */
  id: string;
  /** Start and end as ISO 8601 datetimes with offset, e.g. "2026-11-09T08:00:00.000Z". */
  start: string;
  end: string;
  /** false = shown but not selectable (already booked or blocked). */
  available: boolean;
}

/** One day column in the slot grid. */
export interface BookingDay {
  /** Calendar date in the display time zone, "YYYY-MM-DD". */
  date: string;
  slots: BookingSlot[];
}

/** What the form sends. Validated by bookingRequestSchema (schema.ts) on both sides. */
export interface BookingRequest {
  slotId: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  /** Language of the page, for the confirmation email. */
  locale: Locale;
  /** Honeypot ("Website"): always empty for humans. If filled, treat as spam (fake success). */
  website: string;
}

/** Why a booking failed. The UI shows one generic message for all of them. */
export type BookingErrorCode = 'slot_unavailable' | 'validation' | 'rate_limited' | 'server';

export type BookingResult =
  | {
      ok: true;
      booking: {
        /** Booking reference. */
        id: string;
        slot: BookingSlot;
        /** The customer's email (where the confirmation was sent). */
        email: string;
      };
    }
  | { ok: false; error: BookingErrorCode };
