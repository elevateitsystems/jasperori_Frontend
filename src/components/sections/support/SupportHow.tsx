import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { SupportPageContent } from '@/types/content';

interface SupportHowProps {
  content: SupportPageContent['how'];
}

/**
 * Support "02 / How it works" (spec: "Container:margin" at y1988). White, 1136px inner, 128px
 * bottom padding. In the design this block starts 11px before the lavender section ends (it has
 * no background), so its content sits 117px below the lavender: top padding 117px.
 * Columns: 341px heading, 156px gap, 639px steps. Each step row: 1px navy/15 top border (no line
 * under the last row, as in the screenshot), 32px vertical padding, 64px number column.
 */
export function SupportHow({ content }: SupportHowProps) {
  return (
    <Section
      labelledBy="support-how-title"
      width="inner"
      className="bg-white pt-20 pb-20 lg:pt-29.25 lg:pb-32"
      innerClassName="grid gap-10 lg:grid-cols-[341fr_639fr] lg:gap-x-39"
    >
      <div>
        <SectionLabel className="font-bold text-red">{content.label}</SectionLabel>
        <h2 id="support-how-title" className="mt-8 text-h3-lg tracking-tight-5 text-zinc-950">
          {content.title}
        </h2>
      </div>
      <ol>
        {content.steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[64px_minmax(0,1fr)] border-t border-navy/15 py-8"
          >
            <span aria-hidden="true" className="text-title-16 text-purple">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-title-24 text-zinc-950">{step.title}</h3>
              <p className="mt-3 text-body-sm-loose text-ink-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
