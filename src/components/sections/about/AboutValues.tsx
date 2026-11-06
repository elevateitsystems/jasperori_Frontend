import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { AboutPageContent } from '@/types/content';

interface AboutValuesProps {
  content: AboutPageContent['values'];
}

/**
 * About "02 / What we value" (spec: purple "Section"). 112px vertical padding, 1136px inner width.
 * Label with a white/20 divider, 56px, then three 352px columns (40px gap), each with a white/35
 * top border. Column height 197px in the design: 1 + 28 + 15 + 32 + 36 + 20 + 56 = 188px of
 * content, plus 9px at the bottom.
 */
export function AboutValues({ content }: AboutValuesProps) {
  return (
    <Section labelledBy="about-values-label" width="inner" className="bg-purple py-20 lg:py-28">
      <SectionLabel id="about-values-label" divider className="border-white/20 text-white/60">
        {content.label}
      </SectionLabel>
      <ol className="mt-14 grid gap-10 lg:grid-cols-3">
        {content.items.map((item, index) => (
          <li key={item.title} className="border-t border-white/35 pt-7 pb-2.25">
            <span
              aria-hidden="true"
              className="block text-micro font-bold tracking-normal text-white/50"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-8 text-h3 text-white">{item.title}</h3>
            <p className="mt-5 text-body-sm-loose text-white/65">{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
