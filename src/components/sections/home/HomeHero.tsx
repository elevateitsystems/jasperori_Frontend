import Image from 'next/image';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { HomePageContent } from '@/types/content';

interface HomeHeroProps {
  content: HomePageContent['hero'];
}

/**
 * Home hero (spec: "Frame 2147229838", 1600x1015). Photo + home hero overlay. The text column is
 * 528px wide and starts 45px inside the site container (x185 at 1600px). The 4x112px accent bar
 * sits 96px left of the text, 5px below the top of the eyebrow.
 * Vertical rhythm: eyebrow, 28px, H1, 28px, paragraph, 40px, buttons. At 1600px the eyebrow sits
 * 226px below the top of the hero and the hero is 1015px tall.
 *
 * Photo crop: Figma uses a custom crop ("stretch") that the spec doesn't record. Matched against
 * the approved screenshot: at 1600px the photo is 1177.6px wide (73.6%), its right edge 23.6px
 * past the hero and its top 28px above it. The box below reproduces that and still covers its area
 * at other widths. The left part without photo sits under the overlay's opaque navy (0-29%).
 * Below `lg` the photo fills the hero and an extra navy layer keeps the full-width text readable.
 */
export function HomeHero({ content }: HomeHeroProps) {
  return (
    <section aria-labelledby="home-hero-title" className="relative isolate overflow-hidden bg-navy">
      <div className="absolute inset-0 -z-20 lg:inset-auto lg:-top-7 lg:-right-[1.475%] lg:h-[calc(100%+28px)] lg:w-[73.6%]">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 74vw, 100vw"
          className="object-cover object-[50%_20%] lg:object-top"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-overlay-home-hero" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/55 lg:hidden" />

      <div className="site-container pt-24 pb-28 md:pt-36 md:pb-40 lg:min-h-253.75 lg:pt-56.5 lg:pb-24">
        <div className="relative max-w-132 lg:ml-11.25">
          <span
            aria-hidden="true"
            className="absolute top-1.25 -left-3.5 h-28 w-1 bg-accent-bar md:-left-8 lg:-left-24"
          />
          <Eyebrow className="text-white">{content.eyebrow}</Eyebrow>
          <h1 id="home-hero-title" className="mt-7 text-hero-home text-white">
            {content.title}
          </h1>
          <p className="mt-7 text-body-lg text-white">{content.text}</p>
          <div className="mt-10 grid gap-3 sm:w-fit sm:grid-cols-2">
            <ButtonLink href={content.primaryCta.href} variant="light" withArrow>
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.secondaryCta.href} variant="outline-light" withArrow>
              {content.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
