import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('about');
}

export default function AboutPage() {
  return <PagePlaceholder pageKey="about" />;
}
