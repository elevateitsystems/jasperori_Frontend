import { Accordion } from '@/components/ui/Accordion';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SplitHeading } from '@/components/ui/SplitHeading';
import type { AboutPageContent } from '@/types/content';

interface AboutCapabilitiesProps {
  content: AboutPageContent['capabilities'];
}

/**
 * About "03 / Our capabilities" (spec: charcoal "Section"). 128px vertical padding, 1136px inner.
 * Heading row (48px top padding; heading 768px, text 320px, bottom-aligned), 56px, then the
 * shared Accordion ("capabilities" variant). All items start closed, as in the design.
 */
export function AboutCapabilities({ content }: AboutCapabilitiesProps) {
  return (
    <Section
      labelledBy="about-capabilities-title"
      width="inner"
      className="bg-charcoal py-20 [--focus-ring:var(--color-white)] lg:py-32"
    >
      <SectionLabel divider className="border-white/10 text-white/40">
        {content.label}
      </SectionLabel>

      <div className="flex flex-col gap-8 pt-12 lg:flex-row lg:items-end lg:justify-between">
        <SplitHeading
          id="about-capabilities-title"
          content={content}
          className="max-w-192 text-h2-xl-tight text-white"
          accentClassName="text-purple"
        />
        <p className="max-w-80 shrink-0 text-caption leading-6 text-white/40 lg:w-80">
          {content.text}
        </p>
      </div>

      <Accordion items={content.items} variant="capabilities" className="mt-14" />
    </Section>
  );
}
