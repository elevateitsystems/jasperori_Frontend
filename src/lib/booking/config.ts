/**
 * Booking settings. The display time zone is UTC as in the approved design; to switch to Swedish
 * time, change `timeZone` to 'Europe/Stockholm' AND the "UTC" labels in the booking content
 * (src/content/{en,sv}/booking.ts).
 */
export const bookingConfig = {
  /** Length of a consultation in minutes. */
  durationMinutes: 45,
  /** Start times offered each day (wall-clock time in `timeZone`). */
  slotTimes: ['08:00', '10:00', '12:00', '14:00'],
  /** Number of weekdays shown, starting tomorrow. */
  days: 5,
  /** IANA time zone used to show (and, in the mock, create) the times. */
  timeZone: 'UTC',
} as const;
