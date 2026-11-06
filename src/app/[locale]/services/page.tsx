import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('services');
}

export default function ServicesPage() {
  return <PagePlaceholder pageKey="services" />;
}
