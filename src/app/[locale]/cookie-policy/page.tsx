import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('cookiePolicy');
}

export default function CookiePolicyPage() {
  return <PagePlaceholder pageKey="cookiePolicy" />;
}
