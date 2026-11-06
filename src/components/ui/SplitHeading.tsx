import { cn } from '@/lib/cn';
import type { SplitTitle } from '@/types/content';

interface SplitHeadingProps {
  content: SplitTitle;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  /** Text style and main colour, e.g. "text-h2-xl text-zinc-950". */
  className?: string;
  /** Colour of the last part, e.g. "text-purple". */
  accentClassName: string;
}

/**
 * One heading whose last part has another colour ("What can we simplify for you?").
 * A normal space joins the parts, so it reads as one sentence.
 */
export function SplitHeading({
  content,
  as: Tag = 'h2',
  id,
  className,
  accentClassName,
}: SplitHeadingProps) {
  return (
    <Tag id={id} className={className}>
      {content.title} <span className={cn(accentClassName)}>{content.titleAccent}</span>
    </Tag>
  );
}
