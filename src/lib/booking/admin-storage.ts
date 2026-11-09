import type { BookingRequest, BookingSlot } from './types';

export const bookingStorageKey = 'techsalem.bookings.v1';
export const bookingUpdateEvent = 'techsalem:bookings-updated';

export interface StoredBooking {
  id: string;
  slotId: string;
  slot: BookingSlot;
  name: string;
  email: string;
  company: string;
  message: string;
  locale: BookingRequest['locale'];
  createdAt: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

export function readStoredBookings(): StoredBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(bookingStorageKey) ?? '[]');
    return Array.isArray(value) ? (value as StoredBooking[]) : [];
  } catch {
    return [];
  }
}

export function writeStoredBookings(bookings: StoredBooking[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(bookingStorageKey, JSON.stringify(bookings));
  window.dispatchEvent(new Event(bookingUpdateEvent));
}
