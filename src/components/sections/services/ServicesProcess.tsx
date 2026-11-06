import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { ServicesPageContent } from '@/types/content';

interface ServicesProcessProps {
  content: ServicesPageContent['process'];
}

/**
 * Services "02 / From need to outcome" (spec: cloud "Section" at y2533). 128px vertical padding,
 * 1136px inner width. Header: two 450px columns at the edges, text bottom-aligned with the
 * heading. 80px below: three steps (357px columns, 32px gaps) with a 1px navy/15 line behind the
 * 40px number circles, 20px from the top.
 * Mobile: the steps stack and the line is hidden (see the phase report for why).
 */
export function ServicesProcess({ content }: ServicesProcessProps) {
  return (
    <Section labelledBy="services-process-title" width="inner" className="bg-cloud py-20 lg:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:w-112.5">
          <SectionLabel className="font-bold text-red">{content.label}</SectionLabel>
          <h2 id="services-process-title" className="mt-8 text-h2-snug text-zinc-950">
            {content.title}
          </h2>
        </div>
        <p className="text-body-loose text-ink-muted lg:w-112.5">{content.text}</p>
      </div>

      <div className="relative mt-14 lg:mt-20">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-5 hidden h-px bg-navy/15 md:block"
        />
        <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-navy text-eyebrow tracking-normal text-white"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-10 text-title-24 font-extrabold text-zinc-950">{step.title}</h3>
              <p className="mt-4 text-body-sm-loose text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
