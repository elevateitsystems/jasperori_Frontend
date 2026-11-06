import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SeparatedGrid } from '@/components/ui/SeparatedGrid';
import type { ContactPageContent } from '@/types/content';

interface ContactStepsProps {
  content: ContactPageContent['steps'];
}

/**
 * Contact "03 / What happens next" (spec: navy "Section" at y2230). 96px vertical padding, 1136px
 * inner. 48px below the label: three 378x256 navy cards with 1px white/15 separators (the shared
 * SeparatedGrid, as on Home "Why"), 32px padding, number then title 64px below.
 */
export function ContactSteps({ content }: ContactStepsProps) {
  return (
    <Section labelledBy="contact-steps-title" width="inner" className="bg-navy py-20 lg:py-24">
      <SectionLabel as="h2" id="contact-steps-title" className="font-bold text-white/40">
        {content.label}
      </SectionLabel>
      <SeparatedGrid className="mt-12 md:grid-cols-3">
        {content.items.map((item, index) => (
          <li key={item} className="bg-navy p-8 md:min-h-64">
            <span aria-hidden="true" className="block text-button text-red">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-16 text-title-24 text-white">{item}</h3>
          </li>
        ))}
      </SeparatedGrid>
    </Section>
  );
}
