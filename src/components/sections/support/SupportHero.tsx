import { CroppedImage } from '@/components/ui/CroppedImage';
import { SquareEyebrow } from '@/components/ui/SquareEyebrow';
import type { SupportPageContent } from '@/types/content';

interface SupportHeroProps {
  content: SupportPageContent['hero'];
}

/** Compact service-catalog hero, sized to match the client's current Services page. */
export function SupportHero({ content }: SupportHeroProps) {
  return (
    <section aria-labelledby="support-hero-title" className="relative isolate overflow-hidden bg-navy on-dark">
      <div className="absolute inset-0 -z-20">
        <CroppedImage image={content.image} priority sizes="100vw" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-overlay-hero-support" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35" />
      <div className="site-container flex min-h-80 items-center py-14 md:min-h-88 lg:min-h-92">
        <div className="mx-auto max-w-160 text-center">
          <SquareEyebrow>{content.eyebrow}</SquareEyebrow>
          <h1 id="support-hero-title" className="mt-5 text-display-md text-white">
            {content.title}
          </h1>
          <p className="mx-auto mt-5 max-w-144 text-body-sm text-white/85 md:text-body">
            {content.text}
          </p>
        </div>
      </div>
    </section>
  );
}
