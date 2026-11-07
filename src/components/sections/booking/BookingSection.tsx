import { SectionLabel } from '@/components/ui/SectionLabel';
import type { BookingPageContent } from '@/types/content';

import { BookingForm } from './BookingForm';

interface BookingSectionProps {
  content: BookingPageContent;
  siteEmail: string;
  /** Section id; the hero button links here. */
  id: string;
}

/**
 * Booking "01 / Choose a time" (spec: "Container:margin" at y1089, 2px below the hero). White,
 * 128px vertical padding (+2px above), 1136px inner. Left 341px: label, H2 48/48.96 (32px above),
 * text (28px above), facts (40px above; 1px top border, 28px padding, 20px row gap). Right, from
 * x729 (156px gap): the 639px form box (client component).
 */
export function BookingSection({ content, siteEmail, id }: BookingSectionProps) {
  const { intro } = content;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-white py-20 lg:pt-32.5 lg:pb-32">
      <div className="site-container">
        <div className="mx-auto grid max-w-inner gap-12 lg:grid-cols-[341fr_639fr] lg:items-start lg:gap-x-39">
          <div>
            <SectionLabel tracking="wide" className="font-bold text-purple">
              {intro.label}
            </SectionLabel>
            <h2 id={`${id}-title`} className="mt-8 text-h2-snug text-zinc-950">
              {intro.title}
            </h2>
            <p className="mt-7 text-body-loose text-ink-muted">{intro.text}</p>
            <dl className="mt-10 grid gap-5 border-t border-navy/15 pt-7">
              {intro.facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-6 text-body-sm">
                  <dt className="text-ink-muted">{fact.label}</dt>
                  <dd className="text-right font-bold text-zinc-950">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <BookingForm content={content.form} siteEmail={siteEmail} />
        </div>
      </div>
    </section>
  );
}
