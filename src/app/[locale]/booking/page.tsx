import { getLocale } from 'next-intl/server';

import { BookingSection } from '@/components/sections/booking/BookingSection';
import { PageHero } from '@/components/sections/PageHero';
import { getContent } from '@/content';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('booking');
}

/**
 * Booking (spec: design/spec/booking.md). Hero + booking section; the form talks to the booking
 * service (src/lib/booking, a mock for now). No contact strip: the footer follows.
 */
export default async function BookingPage() {
  const locale = await getLocale();
  const [booking, site] = await Promise.all([
    getContent(locale, 'booking'),
    getContent(locale, 'site'),
  ]);
  const siteEmail = site.footer.connect.links.email.label;

  return (
    <>
      <PageHero content={booking.hero} layout="simple" overlay="about" id="booking-hero-title" />
      <BookingSection content={booking} siteEmail={siteEmail} id="choose-a-time" />
    </>
  );
}
