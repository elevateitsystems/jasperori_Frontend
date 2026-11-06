import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SplitHeading } from '@/components/ui/SplitHeading';
import { cn } from '@/lib/cn';
import type { SplitTitle } from '@/types/content';

interface PerspectiveProps {
  content: SplitTitle & { label: string; text: string };
  /** Unique heading id per page. */
  id: string;
  /**
   * lg: ExtraBold 16px label that wraps to two lines (About).
   * sm: ExtraBold 10/15, 2.2px tracking (Services).
   */
  labelSize: 'sm' | 'lg';
  /** Vertical padding; 120px top and bottom by default. */
  className?: string;
}

/**
 * "01 / Our perspective" (spec: About and Services "Frame 2147240630"). Cloud background, 1136px
 * inner width. From `xl`: a 149px label column, then the 741px content column starting 296px
 * from the left edge (147px gap). Heading ExtraBold 60/61.2 with a red accent; text 16/32, 36px
 * below, max 672px.
 */
export function Perspective({ content, id, labelSize, className }: PerspectiveProps) {
  return (
    <Section
      labelledBy={id}
      width="inner"
      className={cn('bg-cloud py-20 lg:py-30', className)}
      innerClassName="grid gap-6 xl:grid-cols-[149px_minmax(0,741px)] xl:gap-x-36.75"
    >
      <SectionLabel size={labelSize} tracking="wide" className="text-ink-muted">
        {content.label}
      </SectionLabel>
      <div>
        <SplitHeading
          id={id}
          content={content}
          className="text-h2-xl-snug text-zinc-950"
          accentClassName="text-red"
        />
        <p className="mt-9 max-w-168 text-body-loose text-ink-muted">{content.text}</p>
      </div>
    </Section>
  );
}
