import { z } from 'zod';

import { routing } from '@/i18n/routing';

import type { BookingRequest } from './types';

/**
 * The booking form rules, defined once: the form validates with `bookingFormSchema`, the backend
 * validates the full request with `bookingRequestSchema`.
 */
export const bookingFormSchema = z.object({
  slotId: z.string().min(1),
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().max(2000).optional(),
});

/**
 * Full request as sent to the service. The honeypot must be empty; a filled honeypot is spam and
 * should get a silent fake success (never an error that tells bots what went wrong).
 */
export const bookingRequestSchema = bookingFormSchema.extend({
  locale: z.enum(routing.locales),
  website: z.string().max(0),
}) satisfies z.ZodType<BookingRequest>;

export type BookingFormValues = z.input<typeof bookingFormSchema>;
export type BookingFormField = keyof BookingFormValues;
