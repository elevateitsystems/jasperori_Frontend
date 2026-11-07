# Booking service (frontend contract)

The booking page (`/[locale]/booking`) talks to the backend only through the `BookingService`
interface in `service.ts`. Today it uses `mock-service.ts`. To connect the real backend, implement
the interface (for example with `fetch` calls to your API) and change the one line in
`service.ts`:

```ts
export const bookingService: BookingService = realBookingService; // was mockBookingService
```

Nothing else in the UI needs to change.

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

- **Real slots** should come from the admin panel (opening hours, blocked times, bookings), not
  from `config.ts`. Re-check that the slot is still free when booking (`slot_unavailable`).
- **Emails**: send a confirmation to the customer (in `locale`), and a notification to
  hej@techsalem.se and jasper@techsalem.se with **Reply-To set to the customer's email**.
- **Spam protection** belongs on the server: verify a captcha and rate-limit by IP/email. If the
  honeypot (`website`) is filled, return a fake success and do not book or send anything.
- **Time zone**: the design shows UTC. To switch to Swedish time, change `timeZone` in `config.ts`
  to `Europe/Stockholm` and update the "UTC" labels in `src/content/{en,sv}/booking.ts`.
- **Mock test values**: `fail@example.com` returns an error; a filled honeypot returns a fake
  success.
