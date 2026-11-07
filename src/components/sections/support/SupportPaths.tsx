import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { SupportCardTone, SupportPageContent } from '@/types/content';

const cardTones: Record<SupportCardTone, string> = {
  navy: 'bg-navy',
  purple: 'bg-purple',
};

interface SupportPathsProps {
  content: SupportPageContent['paths'];
}

/**
 * Support "01 / Choose your path" (spec: lavender "Section", 912px tall at 1600px). 128px vertical
 * padding, 1136px inner. Header: 720px (label + heading) and 384px (text, bottom-aligned), 32px
 * gap. 64px below: two 558x425 cards (20px gap), 48px padding; the content block starts 128px
 * below the number. Only the "Start support request" link is clickable.
 */
export function SupportPaths({ content }: SupportPathsProps) {
  return (
    <Section labelledBy="support-paths-title" width="inner" className="bg-lavender py-20 lg:py-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-8">
        <div className="lg:w-180">
          <SectionLabel tracking="wide" className="text-purple">
            {content.label}
          </SectionLabel>
          <h2 id="support-paths-title" className="mt-8 text-h2-xl-none text-zinc-950">
            {content.title}
          </h2>
        </div>
        <p className="text-body-loose text-ink-muted lg:w-96">{content.text}</p>
      </div>

      <ul data-reveal className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16">
        {content.cards.map((card, index) => (
          <li
            key={card.title}
            className={cn(
              'flex flex-col p-8 on-dark md:p-12 lg:min-h-106.25',
              cardTones[card.tone],
            )}
          >
            <span aria-hidden="true" className="text-caption font-bold text-white/45">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="pt-12 lg:pt-32">
              <h3 className="text-h3-lg text-white">{card.title}</h3>
              <p className="mt-5 max-w-112 text-body text-white/60">{card.text}</p>
              <Link
                href={card.link.href}
                className="touch-target mt-9 flex w-fit border-b border-white/50 pb-2 text-eyebrow font-bold tracking-caps-15 text-white transition-colors hover:border-white"
              >
                {card.link.label}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
