# Booking service

The booking form calls `bookingService` in `service.ts`. That client talks to the Next.js route handlers:

- `GET /api/booking/availability` — the next weekdays of slots
- `POST /api/booking` — create a booking

Both are implemented in `src/lib/booking/repository.ts` and stored in the Supabase Postgres
database through Prisma. The server always builds the grid from
`config.ts` (time zone, slot times, duration, number of days). A slot disappears once it has a
booking that is not cancelled.

Confirmation email is not sent yet. The booking is stored and listed in the admin panel. Email
delivery is a later step. The success message does not claim that an email was sent.

## Interface

```ts
interface BookingService {
  getAvailability(params: { from: Date; days: number; timeZone: string }): Promise<BookingDay[]>;
  createBooking(request: BookingRequest): Promise<BookingResult>;
}
```

The UI calls `getAvailability({ from: new Date(), days: 5, timeZone: 'UTC' })` in the browser
(values from `config.ts`) and shows the result as day columns.

### `BookingDay[]` (response of `getAvailability`)

```json
[
  {
    "date": "2026-11-09",
    "slots": [
      {
        "id": "2026-11-09T08:00",
        "start": "2026-11-09T08:00:00.000Z",
        "end": "2026-11-09T08:45:00.000Z",
        "available": true
      }
    ]
  }
]
```

- `date`: calendar date in the display time zone (`YYYY-MM-DD`).
- `id`: any stable string; it comes back as `slotId`.
- `start` / `end`: ISO 8601 with offset. The UI formats them in `config.timeZone`.
- `available: false` slots are shown crossed out and can't be chosen.
- Return days in order, with slots in time order. An empty list (or no available slots) shows the
  "no available times" message.

### `BookingRequest` (input of `createBooking`)

```json
{
  "slotId": "2026-11-09T08:00",
  "name": "Anna Andersson",
  "email": "anna@example.se",
  "company": "Example AB",
  "message": "We would like to talk about…",
  "locale": "sv",
  "website": ""
}
```

Validate it on the server with `bookingRequestSchema` from `schema.ts` (zod; the same rules as the
form): slot required; name 2–100 characters; valid email; company max 100; message max 2000;
`website` (honeypot) must be empty; `locale` is `sv` or `en`.

### `BookingResult` (response of `createBooking`)

```json
{
  "ok": true,
  "booking": { "id": "BK-1234", "slot": { "...": "BookingSlot" }, "email": "anna@example.se" }
}
```

```json
{ "ok": false, "error": "slot_unavailable" }
```

`error` is one of `slot_unavailable`, `validation`, `rate_limited`, `server`. The UI shows one
generic message ("Something went wrong…") and keeps the entered values.

## Backend notes

- Booked slots are stored in Postgres. The grid itself (hours, length, time zone, how many days) still
  comes from `config.ts`. Changing opening hours in the admin panel is a later step.
- The server re-checks that the slot is free when booking (`slot_unavailable`).
- **Emails are not sent yet.** When an email service is connected, send a confirmation to the
  customer (in `locale`) and a notification to hej@techsalem.se and jasper@techsalem.se with
  **Reply-To set to the customer's email**.
- Spam protection: 8 booking attempts per hour per IP. If the honeypot (`website`) is filled, the
  API returns a fake success and does not store a booking. A captcha can be added later.
- **Time zone**: the design shows UTC. To switch to Swedish time, change `timeZone` in `config.ts`
  to `Europe/Stockholm` and update the "UTC" labels in `src/content/{en,sv}/booking.ts`.
- Admin sign-in, content edits and booking status live in the same database. See `src/lib/db`.
