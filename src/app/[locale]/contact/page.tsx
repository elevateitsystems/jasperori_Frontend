import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('contact');
}

export default function ContactPage() {
  return <PagePlaceholder pageKey="contact" />;
}
