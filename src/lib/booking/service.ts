import { mockBookingService } from './mock-service';
import type { BookingDay, BookingRequest, BookingResult } from './types';

/**
 * The booking API used by the UI. The backend developer implements this interface (for example
 * with fetch calls to the backend) and swaps the instance below. See README.md.
 */
export interface BookingService {
  /** Bookable days from `from` (exclusive of today), `days` weekdays, shown in `timeZone`. */
  getAvailability(params: { from: Date; days: number; timeZone: string }): Promise<BookingDay[]>;
  /** Books a slot. Must re-validate the request (bookingRequestSchema) and re-check the slot. */
  createBooking(request: BookingRequest): Promise<BookingResult>;
}

/** The instance the UI uses. Replace the mock with the real implementation here. */
export const bookingService: BookingService = mockBookingService;
