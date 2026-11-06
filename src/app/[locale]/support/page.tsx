import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('support');
}

export default function SupportPage() {
  return <PagePlaceholder pageKey="support" />;
}
