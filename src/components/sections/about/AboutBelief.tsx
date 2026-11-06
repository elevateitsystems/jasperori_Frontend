import { CroppedImage } from '@/components/ui/CroppedImage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { imageCrops } from '@/lib/image-crops';
import type { AboutPageContent } from '@/types/content';

interface AboutBeliefProps {
  content: AboutPageContent['quote'];
}

/**
 * About "What we believe" (spec: two "Container" frames, 520px tall). Left: the 798px photo with
 * Figma's exact crop. Right: the red 801px panel, 80px padding; the 693px quote runs into the
 * right padding in the design (28px left), so the right padding is 28px here.
 * The spec centres the panel content, but Figma's frame height leaves out the source line, so the
 * content sits 131px below the panel top (as in the screenshot); we place it there from `lg` up.
 * Below `lg` the image sits above the panel.
 */
export function AboutBelief({ content }: AboutBeliefProps) {
  return (
    <section aria-labelledby="about-belief-label" className="grid lg:grid-cols-[799fr_801fr]">
      <div className="relative aspect-798/520 overflow-hidden lg:aspect-auto lg:h-130">
        <CroppedImage
          image={content.image}
          crop={imageCrops.aboutSplit}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <figure className="bg-red px-6 py-14 [--focus-ring:var(--color-white)] md:p-14 lg:h-130 lg:pt-32.75 lg:pr-7 lg:pb-20 lg:pl-20">
        <SectionLabel id="about-belief-label" tracking="wide" className="text-white/60">
          {content.label}
        </SectionLabel>
        <blockquote className="mt-8 max-w-173.25 text-quote text-white">
          <p>{content.text}</p>
        </blockquote>
        <figcaption className="mt-10 text-eyebrow font-bold tracking-caps-16 text-white">
          {content.source}
        </figcaption>
      </figure>
    </section>
  );
}
