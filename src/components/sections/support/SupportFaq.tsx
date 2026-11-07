import { Accordion } from '@/components/ui/Accordion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { SupportPageContent } from '@/types/content';

interface SupportFaqProps {
  content: SupportPageContent['faq'];
}

/**
 * Support FAQ (spec: charcoal "Section" at y2655). 96px vertical padding; a centred 860px column
 * (900px container with 20px side padding). The centred label is the section heading (h2);
 * 40px below it the shared Accordion ("faq" variant), all items closed.
 */
export function SupportFaq({ content }: SupportFaqProps) {
  return (
    <section aria-labelledby="support-faq-title" className="bg-charcoal py-20 on-dark lg:py-24">
      <div className="site-container">
        <div data-reveal className="mx-auto max-w-215">
          <SectionLabel
            as="h2"
            id="support-faq-title"
            className="text-center font-bold text-white/40"
          >
            {content.label}
          </SectionLabel>
          <Accordion
            variant="faq"
            className="mt-10"
            items={content.items.map((item) => ({ title: item.question, text: item.answer }))}
          />
        </div>
      </div>
    </section>
  );
}
