import { ButtonLink } from '@/components/ui/ButtonLink';
import { CroppedImage } from '@/components/ui/CroppedImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SquareEyebrow } from '@/components/ui/SquareEyebrow';
import { cn } from '@/lib/cn';
import type { ImageCrop } from '@/lib/image-crops';
import type { PageHeroContent } from '@/types/content';

/** Purple overlay per page frame (exact angles in globals.css). */
const overlays = {
  about: 'bg-overlay-hero-about',
  services: 'bg-overlay-hero-services',
  support: 'bg-overlay-hero-support',
} as const;

interface PageHeroProps {
  content: PageHeroContent;
  /** about: About + Booking; services: Services + Contact; support: Support. */
  overlay: keyof typeof overlays;
  /** Figma custom image crop (from `lg` up). */
  crop?: ImageCrop;
  /** Services: a black 20% layer on top of the purple overlay. */
  darken?: boolean;
  /**
   * accent-bar: About (4px gradient bar, two buttons).
   * simple: Services, Support, Contact, Booking (red square in the eyebrow, one flat button).
   */
  layout?: 'accent-bar' | 'simple';
  /** Unique id for the H1 (aria-labelledby). */
  id: string;
}

/**
 * Inner-page hero (spec: "Frame 2147229838", 1600x1015). Photo + purple overlay. At 1600px the
 * content starts at x176, 361px below the top of the hero. Two layouts:
 * - accent-bar (About): 4x112px bar at x176, text at x196. Eyebrow, 28px, H1 (max 876px),
 *   46px (18px gap + 28px padding), paragraph (max 528px), 40px, buttons (12px gap).
 * - simple (Services, Support, Contact, Booking): 896px block. Eyebrow with a 6x6px red square
 *   (ExtraBold 10/15, 2.4px tracking, white/60), 28px, H1 (max 896px), 32px, paragraph
 *   (max 576px), 32px, one flat red button.
 */
export function PageHero({
  content,
  overlay,
  crop,
  darken = false,
  layout = 'accent-bar',
  id,
}: PageHeroProps) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden bg-purple">
      <div className="absolute inset-0 -z-20">
        <CroppedImage image={content.image} crop={crop} priority sizes="100vw" />
      </div>
      <div aria-hidden="true" className={cn('absolute inset-0 -z-10', overlays[overlay])} />
      {darken ? <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/20" /> : null}
      {/* Small screens: the text runs over the whole photo, so darken it for contrast. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/60 lg:hidden" />

      <div className="site-container pt-24 pb-28 md:pt-36 md:pb-40 lg:min-h-253.75 lg:pt-90.25 lg:pb-24">
        {layout === 'accent-bar' ? (
          <div className="relative pl-5 lg:ml-9">
            <span aria-hidden="true" className="absolute top-0 left-0 h-28 w-1 bg-accent-bar" />
            <Eyebrow className="text-white">{content.eyebrow}</Eyebrow>
            <h1 id={id} className="mt-7 max-w-219 text-display text-white">
              {content.title}
            </h1>
            <p className="mt-11.5 max-w-132 text-body text-white/65">{content.text}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={content.primaryCta.href} variant="accent" withArrow>
                {content.primaryCta.label}
              </ButtonLink>
              {content.secondaryCta ? (
                <ButtonLink href={content.secondaryCta.href} variant="outline-light" withArrow>
                  {content.secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="lg:ml-9">
            <SquareEyebrow>{content.eyebrow}</SquareEyebrow>
            <h1 id={id} className="mt-7 max-w-224 text-display text-white">
              {content.title}
            </h1>
            <p className="mt-8 max-w-144 text-body text-white/65">{content.text}</p>
            <ButtonLink
              href={content.primaryCta.href}
              variant="accent-flat"
              withArrow
              className="mt-8 flex w-full sm:w-fit"
            >
              {content.primaryCta.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
