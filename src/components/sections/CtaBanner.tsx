import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section } from '@/components/ui/Section';
import type { CtaBannerContent } from '@/types/content';

interface CtaBannerProps {
  content: CtaBannerContent;
  /** Unique heading id per page (for aria-labelledby). */
  id?: string;
}

/**
 * Call-to-action banner (spec: Home "Section", 1600x372). Brand gradient, 96px vertical padding,
 * 1136px inner width: heading + text on the left, the white CTA button on the right, centred.
 * The decorative 384px ring is placed exactly as in the spec (left edge at the banner's right
 * edge, 160px above it), so it is clipped and, as in the approved design, not visible.
 */
export function CtaBanner({ content, id = 'cta-banner-title' }: CtaBannerProps) {
  return (
    <div className="relative isolate overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-full z-10 size-96 rounded-full border border-white/10"
      />
      <Section
        labelledBy={id}
        width="inner"
        className="bg-brand py-16 lg:py-24"
        innerClassName="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-168">
          <h2 id={id} className="text-h2 text-white">
            {content.title}
          </h2>
          <p className="mt-5 max-w-144 text-body-loose text-white/75">{content.text}</p>
        </div>
        <ButtonLink
          href={content.button.href}
          variant="cta"
          withArrow
          className="w-full shrink-0 sm:w-auto sm:self-start lg:self-auto"
        >
          {content.button.label}
        </ButtonLink>
      </Section>
    </div>
  );
}
