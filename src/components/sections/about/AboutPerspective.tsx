import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SplitHeading } from '@/components/ui/SplitHeading';
import type { AboutPageContent } from '@/types/content';

interface AboutPerspectiveProps {
  content: AboutPageContent['perspective'];
}

/**
 * About "01 / Our perspective" (spec: "Frame 2147240630"). Cloud, 120px vertical padding, 1136px
 * inner width. From `xl`: a 149px label column (the label wraps to two lines, as in the design),
 * then the 741px content column starting 296px from the left edge (147px gap).
 */
export function AboutPerspective({ content }: AboutPerspectiveProps) {
  return (
    <Section
      labelledBy="about-perspective-title"
      width="inner"
      className="bg-cloud py-20 lg:py-30"
      innerClassName="grid gap-6 xl:grid-cols-[149px_minmax(0,741px)] xl:gap-x-36.75"
    >
      <SectionLabel size="lg" className="text-ink-muted">
        {content.label}
      </SectionLabel>
      <div>
        <SplitHeading
          id="about-perspective-title"
          content={content}
          className="text-h2-xl-snug text-zinc-950"
          accentClassName="text-red"
        />
        <p className="mt-9 max-w-168 text-body-loose text-ink-muted">{content.text}</p>
      </div>
    </Section>
  );
}
