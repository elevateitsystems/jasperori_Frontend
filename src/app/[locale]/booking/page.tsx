import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('booking');
}

export default function BookingPage() {
  return <PagePlaceholder pageKey="booking" />;
}
