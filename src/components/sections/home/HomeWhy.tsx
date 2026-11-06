import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import type { HomePageContent } from '@/types/content';

interface HomeWhyProps {
  content: HomePageContent['why'];
}

/**
 * Home "Why TechSalem" (spec: navy "Section"). 128px vertical padding, 1136px inner width.
 * Four navy cards on a white/15 grid with a 1px gap, so 1px lines show between the cards.
 */
export function HomeWhy({ content }: HomeWhyProps) {
  return (
    <Section labelledBy="home-why-title" width="inner" className="bg-navy py-20 lg:py-32">
      <Eyebrow className="text-red">{content.eyebrow}</Eyebrow>
      <h2 id="home-why-title" className="mt-5 max-w-168 text-h2 text-white">
        {content.title}
      </h2>

      <ol className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {content.items.map((item, index) => (
          <li key={item.title} className="bg-navy p-7">
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full border border-white/20 text-button font-extrabold text-red"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-12 text-title-20 text-white">{item.title}</h3>
            <p className="mt-3 text-body-sm-relaxed text-white/60">{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
