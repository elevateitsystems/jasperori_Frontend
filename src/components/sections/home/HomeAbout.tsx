import Image from 'next/image';

import { ArrowLink } from '@/components/ui/ArrowLink';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { HomePageContent } from '@/types/content';

interface HomeAboutProps {
  content: HomePageContent['about'];
}

/**
 * Home "About TechSalem" (spec: "Frame 2147240623"). White, 120px padding on all sides: the
 * content is 1360px wide at 1600px (20px wider than the site container on each side).
 * Columns 721px + 31px gap + 608px, vertically centred. The 706x559 image sits in the 721px
 * column (591px tall); the "Our focus" glass badge sticks out 56px left of the image and 42px
 * below it (320x128 including its 1px border, which Figma draws inside the frame). The text
 * column uses Inter, the badge Manrope.
 */
export function HomeAbout({ content }: HomeAboutProps) {
  return (
    <section aria-labelledby="home-about-title" className="bg-white py-20 lg:py-30">
      <div className="site-container">
        <div className="grid items-center gap-y-20 lg:grid-cols-[721fr_608fr] lg:gap-x-7.75 xl:-mx-5">
          <div className="lg:pb-8">
            <div className="relative max-w-176.5">
              <div className="relative aspect-706/559 overflow-hidden rounded-lg">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  sizes="(min-width: 1600px) 706px, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10.5 left-4 w-80 max-w-[calc(100%-2rem)] border border-red bg-navy/85 px-6 py-5.75 backdrop-blur-xl lg:-left-14 lg:max-w-none">
                <p className="text-eyebrow font-bold tracking-caps-18 text-white/60">
                  {content.badge.label}
                </p>
                <p className="mt-2 text-title-18 text-white">{content.badge.text}</p>
              </div>
            </div>
          </div>

          <div className="font-inter">
            <Eyebrow font="inter" className="text-purple">
              {content.eyebrow}
            </Eyebrow>
            <h2 id="home-about-title" className="mt-3 max-w-136 text-inter-h2 text-navy">
              {content.title}
            </h2>
            <p className="mt-6 max-w-136 text-inter-lead text-ink-muted">{content.paragraphs[0]}</p>
            <p className="mt-4 max-w-136 text-inter-lead text-ink-muted">{content.paragraphs[1]}</p>
            {/* Spec: a 32px margin, then the inline link in a 24px line. */}
            <div className="mt-8">
              <ArrowLink link={content.link} className="gap-1.5 text-inter-label text-purple" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
