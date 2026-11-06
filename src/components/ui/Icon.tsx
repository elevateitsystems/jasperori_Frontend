import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChartColumnIcon,
  HeadphonesIcon,
  NetworkIcon,
  ShieldCheckIcon,
  WorkflowIcon,
  type LucideIcon,
} from 'lucide-react';

import type { IconName } from '@/types/icons';

/** Content icon names -> lucide-react icons (matched to the Figma vectors). */
const icons: Record<IconName, LucideIcon> = {
  'arrow-right': ArrowRightIcon,
  'arrow-up-right': ArrowUpRightIcon,
  network: NetworkIcon,
  workflow: WorkflowIcon,
  'chart-column': ChartColumnIcon,
  'shield-check': ShieldCheckIcon,
  headphones: HeadphonesIcon,
};

interface IconProps {
  name: IconName;
  /** Size utilities, e.g. "size-4" (16px) or "size-5" (20px). */
  className?: string;
}

/** Decorative line icon (hidden from screen readers; the text next to it carries the meaning). */
export function Icon({ name, className }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" focusable="false" className={className} />;
}
