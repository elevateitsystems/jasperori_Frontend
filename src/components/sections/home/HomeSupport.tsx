import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { Link } from '@/i18n/navigation';
import type { HomePageContent } from '@/types/content';

interface HomeSupportProps {
  content: HomePageContent['support'];
}

/**
 * Home "Support" (spec: "Container" at y3548). 1136px inner width. Spacing from the spec
 * positions: 135px after the navy section, 121px before the CTA banner.
 * Each card (558x288 at 1600px) is one link; its accessible name is the card title.
 */
export function HomeSupport({ content }: HomeSupportProps) {
  return (
    <Section
      labelledBy="home-support-title"
      width="inner"
      className="bg-white py-20 lg:pt-33.75 lg:pb-30.25"
    >
      <Eyebrow className="text-purple">{content.eyebrow}</Eyebrow>
      <h2 id="home-support-title" className="mt-5 max-w-168 text-h2 text-zinc-950">
        {content.title}
      </h2>

      <ul data-reveal className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14">
        {content.cards.map((card, index) => {
          const titleId = `home-support-card-${index + 1}`;
          return (
            <li key={card.link.href}>
              <Link
                href={card.link.href}
                className="group relative flex h-full min-h-72 flex-col justify-between gap-12 overflow-hidden border border-navy/10 bg-cloud p-8 transition-colors hover:border-navy/25"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 right-6 text-watermark text-navy/4"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative grid size-12 place-items-center rounded-sm bg-navy text-white">
                  <Icon name={card.icon} className="size-6" />
                </div>
                <div className="relative">
                  <h3 id={titleId} className="text-title-24 font-extrabold text-zinc-950">
                    {card.title}
                  </h3>
                  <p id={`${titleId}-text`} className="mt-3 text-body-sm-loose text-ink-muted">
                    {card.text}
                  </p>
                  <p className="mt-6 flex items-center gap-2 text-button text-zinc-950">
                    {card.link.label}
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
