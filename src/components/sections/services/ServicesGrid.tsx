import { CroppedImage } from '@/components/ui/CroppedImage';
import { cn } from '@/lib/cn';
import type { ServiceCardTone, ServicesPageContent } from '@/types/content';

/** Colours per card tone (spec: navy / lavender / red "Article"). */
const tones: Record<
  ServiceCardTone,
  { card: string; number: string; plus: string; label: string; title: string; text: string }
> = {
  navy: {
    card: 'bg-navy',
    number: 'text-white/50',
    plus: 'text-white',
    label: 'text-white/55',
    title: 'text-white',
    text: 'text-white/60',
  },
  lavender: {
    card: 'bg-lavender',
    number: 'text-purple',
    plus: 'text-navy',
    label: 'text-purple',
    title: 'text-navy',
    text: 'text-ink-muted',
  },
  red: {
    card: 'bg-red',
    number: 'text-white/50',
    plus: 'text-white',
    label: 'text-white/55',
    title: 'text-white',
    text: 'text-white/60',
  },
};

interface ServiceCardProps {
  item: ServicesPageContent['services']['items'][number];
  number: string;
  areaLabel: string;
}

/** 420px tall at 1600px, 40px padding; number + "+" at the top, label/title/text at the bottom. */
function ServiceCard({ item, number, areaLabel }: ServiceCardProps) {
  const tone = tones[item.tone];
  return (
    <article
      className={cn(
        'flex min-h-80 flex-col justify-between gap-10 p-8 md:p-10 lg:h-105',
        tone.card,
      )}
    >
      <div className="flex items-start justify-between">
        <span aria-hidden="true" className={cn('text-eyebrow tracking-caps-18', tone.number)}>
          {number}
        </span>
        <span aria-hidden="true" className={cn('text-lead', tone.plus)}>
          +
        </span>
      </div>
      <div>
        <p className={cn('text-micro', tone.label)}>{areaLabel}</p>
        <h3 className={cn('mt-5 max-w-144 text-h2-snug', tone.title)}>{item.title}</h3>
        <p className={cn('mt-6 max-w-144 text-body-sm-loose', tone.text)}>{item.text}</p>
      </div>
    </article>
  );
}

interface ServicesGridProps {
  content: ServicesPageContent['services'];
  /** id of the heading that introduces the services (the perspective heading). */
  labelledBy: string;
}

/**
 * Services bento grid (spec: "Container:margin" at y1549). 1136px inner width, 16px gaps,
 * 128px bottom padding. Row 1: navy 752px + lavender 368px; row 2: red 464px + image card 656px.
 * The grid starts 62px above the end of the cloud perspective section (the cards overlap its
 * bottom padding), so this section has no background and a -62px top margin, as in the design.
 * Tablet: two equal columns per row; mobile: one column.
 */
export function ServicesGrid({ content, labelledBy }: ServicesGridProps) {
  const [first, second, third] = content.items;
  const number = (index: number) => String(index + 1).padStart(2, '0');

  return (
    <section aria-labelledby={labelledBy} className="relative -mt-10 pb-20 lg:-mt-15.5 lg:pb-32">
      <div className="site-container">
        <div className="mx-auto flex max-w-inner flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[752fr_368fr]">
            <ServiceCard item={first} number={number(0)} areaLabel={content.areaLabel} />
            <ServiceCard item={second} number={number(1)} areaLabel={content.areaLabel} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[464fr_656fr]">
            <ServiceCard item={third} number={number(2)} areaLabel={content.areaLabel} />
            <div className="relative isolate flex min-h-80 items-end overflow-hidden p-8 md:p-10 lg:h-105">
              <div className="absolute inset-0 -z-20">
                <CroppedImage
                  image={content.imageCard.image}
                  sizes="(min-width: 1024px) 41vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-overlay-image-text" />
              <p className="max-w-128 text-h3-lg-relaxed text-white">{content.imageCard.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
