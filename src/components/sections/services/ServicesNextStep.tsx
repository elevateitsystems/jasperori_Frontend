import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Link } from '@/i18n/navigation';
import type { ServicesPageContent } from '@/types/content';

interface ServicesNextStepProps {
  content: ServicesPageContent['next'];
}

/**
 * Services "03 / Next step" (spec: purple "Section" at y3230, 420px tall). A 1200px grid (the
 * 1136px inner width plus 32px on each side): left 800px with 80px vertical / 32px side padding,
 * content vertically centred; right a 400px red panel (ends at x1400, purple continues to the
 * right), 40px padding, content at the bottom. The link row has a white/35 top border.
 */
export function ServicesNextStep({ content }: ServicesNextStepProps) {
  return (
    <Section
      labelledBy="services-next-title"
      width="inner"
      className="bg-purple pb-16 [--focus-ring:var(--color-white)] lg:pb-0"
    >
      {/* The centred 1136px box widened by 32px on each side = the 1200px grid of the design. */}
      <div className="grid lg:-mx-8 lg:h-105 lg:grid-cols-[800fr_400fr]">
        <div className="flex items-center py-16 lg:px-8 lg:py-20">
          <div>
            <SectionLabel className="font-bold text-white/50">{content.label}</SectionLabel>
            <h2 id="services-next-title" className="mt-8 max-w-184 text-h2-xl text-white">
              {content.title}
            </h2>
          </div>
        </div>

        <div className="flex flex-col justify-end bg-red p-8 md:p-10">
          <p className="max-w-80 text-body text-white/70">{content.text}</p>
          <Link
            href={content.link.href}
            className="group mt-10 flex items-center justify-between gap-4 border-t border-white/35 pt-6"
          >
            <span className="text-eyebrow tracking-caps-15 text-white">{content.link.label}</span>
            <span
              aria-hidden="true"
              className="text-title-24 font-extrabold text-white transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
