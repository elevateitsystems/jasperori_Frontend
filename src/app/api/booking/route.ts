import { createHash } from 'node:crypto';

import { bookingRequestSchema } from '@/lib/booking/schema';
import { createBookingRecord, findOpenSlot } from '@/lib/booking/repository';
import type { BookingResult } from '@/lib/booking/types';
import { allowRequest } from '@/lib/db/rate-limit';

function clientBucket(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwarded || 'unknown';
  return `booking:${createHash('sha256').update(ip).digest('hex').slice(0, 24)}`;
}

async function fakeSuccess(slotId: string, email: string): Promise<BookingResult> {
  const slot = (await findOpenSlot(slotId)) ?? {
    id: 'ignored',
    start: '2026-01-01T08:00:00.000Z',
    end: '2026-01-01T08:45:00.000Z',
    available: false,
  };
  return { ok: true, booking: { id: 'BK-RECEIVED', slot, email } };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'validation' } satisfies BookingResult, {
      status: 400,
    });
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ ok: false, error: 'validation' } satisfies BookingResult, {
      status: 400,
    });
  }

  const record = body as Record<string, unknown>;
  // A filled honeypot is spam. Pretend it worked and store nothing.
  if (typeof record.website === 'string' && record.website.length > 0) {
    return Response.json(
      await fakeSuccess(
        typeof record.slotId === 'string' ? record.slotId : '',
        typeof record.email === 'string' ? record.email : '',
      ),
    );
  }

  if (!(await allowRequest(clientBucket(request), 8, 60))) {
    return Response.json({ ok: false, error: 'rate_limited' } satisfies BookingResult, {
      status: 429,
    });
  }

  const parsed = bookingRequestSchema.safeParse({ ...record, website: '' });
  if (!parsed.success) {
    return Response.json({ ok: false, error: 'validation' } satisfies BookingResult, {
      status: 400,
    });
  }

  try {
    const result = await createBookingRecord(parsed.data);
    const status = result.ok ? 200 : result.error === 'slot_unavailable' ? 409 : 400;
    return Response.json(result, { status });
  } catch {
    return Response.json({ ok: false, error: 'server' } satisfies BookingResult, { status: 500 });
  }
}
