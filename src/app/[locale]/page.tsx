import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('home');
}

export default function HomePage() {
  return <PagePlaceholder pageKey="home" />;
}
