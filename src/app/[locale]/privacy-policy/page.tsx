import { PagePlaceholder } from '@/components/sections/PagePlaceholder';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('privacyPolicy');
}

export default function PrivacyPolicyPage() {
  return <PagePlaceholder pageKey="privacyPolicy" />;
}
