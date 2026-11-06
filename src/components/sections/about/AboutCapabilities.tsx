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
 * accordion: native <details>/<summary> (keyboard and screen-reader support built in, no JS).
 * All items start closed, as in the design; several can be open at once. The "+" turns into an
 * "x" (45deg rotation) when open.
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

      <ul className="mt-14 border-t border-white/10">
        {content.items.map((item) => (
          <li key={item.title} className="border-b border-white/10">
            <details className="group">
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="size-1.5 shrink-0 bg-purple" />
                <h3 className="text-title-24 font-semibold text-white">{item.title}</h3>
                <span
                  aria-hidden="true"
                  className="ml-auto shrink-0 pl-1 text-lead-sm text-white/50 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="max-w-175 px-7 pb-7 text-body-sm-loose text-white/50">{item.text}</p>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
