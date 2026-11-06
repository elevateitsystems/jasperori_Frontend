import { Icon } from '@/components/ui/Icon';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { InternalLinkItem } from '@/types/content';
import type { IconName } from '@/types/icons';

interface ArrowLinkProps {
  link: InternalLinkItem;
  /** Trailing icon (16px). */
  icon?: Extract<IconName, 'arrow-right' | 'arrow-up-right'>;
  /** Font, colour and gap per use, e.g. "gap-1.5 font-inter text-inter-label text-purple". */
  className?: string;
}

/**
 * Text link with a trailing arrow ("Learn More", "Discover TechSalem"). The arrow moves 2px on
 * hover; the text gets an underline so the hover is visible without the icon.
 */
export function ArrowLink({ link, icon = 'arrow-right', className }: ArrowLinkProps) {
  return (
    <Link
      href={link.href}
      className={cn('group inline-flex items-center underline-offset-4 hover:underline', className)}
    >
      {link.label}
      <Icon
        name={icon}
        className={cn(
          'size-4 shrink-0 transition-transform motion-reduce:transition-none',
          icon === 'arrow-up-right'
            ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            : 'group-hover:translate-x-0.5',
        )}
      />
    </Link>
  );
}
