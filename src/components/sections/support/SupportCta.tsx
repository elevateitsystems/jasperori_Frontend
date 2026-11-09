import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section } from '@/components/ui/Section';
import type { SupportPageContent } from '@/types/content';

interface SupportCtaProps {
  content: SupportPageContent['cta'];
}

export function SupportCta({ content }: SupportCtaProps) {
  return (
    <Section className="bg-cloud pb-16 md:pb-20 lg:pb-24">
      <div className="mx-auto flex max-w-inner flex-col items-start gap-5 rounded-md bg-navy px-6 py-8 text-white md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <h2 className="text-title-24 font-bold">{content.title}</h2>
          <p className="mt-2 max-w-180 text-body-sm text-white/80">{content.text}</p>
        </div>
        <ButtonLink
          href={content.button.href}
          variant="primary"
          className="shrink-0 bg-[#e49a27] text-white hover:bg-[#ce8518]"
        >
          {content.button.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
