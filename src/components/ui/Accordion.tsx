import { cn } from '@/lib/cn';

/**
 * Style variants (values from the specs):
 * - capabilities (About): white/10 lines, 80px rows (20px padding), 6px purple square + 20px gap,
 *   SemiBold 24/32 titles, "+" Light 24/32 at 50%, answer indented 28px (max 644px text).
 * - faq (Support): white/15 lines, 28px vertical padding, Bold 18/28 questions, "+" Light 24/32
 *   at 100%, answer max 672px with 28px bottom padding.
 */
const variants = {
  capabilities: {
    list: 'border-white/10',
    item: 'border-white/10',
    summary: 'min-h-20 gap-5 py-5',
    title: 'text-title-24 font-semibold text-white',
    plus: 'text-white/50',
    panel: 'max-w-175 px-7 pb-7',
  },
  faq: {
    list: 'border-white/15',
    item: 'border-white/15',
    summary: 'gap-6 py-7',
    title: 'text-title-18 text-white',
    plus: 'text-white',
    panel: 'max-w-168 pb-7',
  },
} as const;

interface AccordionProps {
  items: { title: string; text: string }[];
  variant: keyof typeof variants;
  /** Heading level of the item titles. */
  as?: 'h3' | 'h4';
  className?: string;
}

/**
 * Accordion on dark backgrounds, built on native <details>/<summary>: keyboard (Enter/Space) and
 * screen-reader support are built in and it needs no JavaScript. All items start closed and
 * several can be open at once. The "+" rotates 45deg into an "x" when open (no animation with
 * reduced motion). Lines above the first item, between items and below the last one.
 * Put it inside a section with the white focus ring (--focus-ring).
 */
export function Accordion({ items, variant, as: Title = 'h3', className }: AccordionProps) {
  const style = variants[variant];

  return (
    <ul className={cn('border-t', style.list, className)}>
      {items.map((item) => (
        <li key={item.title} className={cn('border-b', style.item)}>
          <details className="group">
            <summary
              className={cn(
                'flex cursor-pointer list-none items-center [&::-webkit-details-marker]:hidden',
                style.summary,
              )}
            >
              {variant === 'capabilities' ? (
                <span aria-hidden="true" className="size-1.5 shrink-0 bg-purple" />
              ) : null}
              <Title className={style.title}>{item.title}</Title>
              <span
                aria-hidden="true"
                className={cn(
                  'ml-auto shrink-0 pl-1 text-lead-sm transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none',
                  style.plus,
                )}
              >
                +
              </span>
            </summary>
            <p className={cn('text-body-sm-loose text-white/50', style.panel)}>{item.text}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
