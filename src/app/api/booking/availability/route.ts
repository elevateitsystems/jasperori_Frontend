import { connection } from 'next/server';

import { getBookingAvailability } from '@/lib/booking/repository';

/** The next bookable days. Always read live, because a new booking changes the grid. */
export async function GET() {
  await connection();
  try {
    return Response.json(await getBookingAvailability(), {
      headers: { 'cache-control': 'no-store' },
    });
  } catch {
    return Response.json({ error: 'server' }, { status: 500 });
  }
}
