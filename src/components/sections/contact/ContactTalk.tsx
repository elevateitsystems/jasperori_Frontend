import { getTranslations } from 'next-intl/server';

import { ContentLink } from '@/components/ui/ContentLink';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { ContactPageContent } from '@/types/content';

interface ContactTalkProps {
  content: ContactPageContent['talk'];
  /** Section id; the hero button links here. */
  id: string;
}

/**
 * Contact "01 / Let's talk" (spec: "Container" at y1226; no section frame). White, 1136px inner.
 * Spacing from the positions: 139px below the hero to the label, 89px after the block.
 * Left 544px: label, H2 72/70.56 (32px above), text (32px above). Right 445px, bottom-aligned:
 * 1px top border, then two 117px full-row links (28px padding, 1px bottom border).
 */
export async function ContactTalk({ content, id }: ContactTalkProps) {
  const t = await getTranslations('a11y');

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-6 bg-white py-20 lg:pt-34.75 lg:pb-22.25"
    >
      <div className="site-container">
        <div
          data-reveal
          className="mx-auto flex max-w-inner flex-col gap-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="lg:w-136">
            <SectionLabel tracking="wide" className="font-bold text-purple">
              {content.label}
            </SectionLabel>
            <h2 id={`${id}-title`} className="mt-8 text-display-md text-zinc-950">
              {content.title}
            </h2>
            <p className="mt-8 text-body-loose text-ink-muted">{content.text}</p>
          </div>

          <ul className="border-t border-navy/15 lg:w-111.25">
            {content.links.map((row) => (
              <li key={row.label} className="border-b border-navy/15">
                <ContentLink
                  link={row.link}
                  newTabLabel={t('newTab')}
                  className="group flex min-h-29 items-center justify-between gap-6 py-7"
                >
                  <span>
                    <span className="block text-micro font-bold tracking-caps-16 text-ink-muted">
                      {row.label}
                    </span>
                    <span className="mt-2 block text-title-20 wrap-anywhere text-zinc-950 transition-colors group-hover:text-purple">
                      {row.link.label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-title-24 font-normal text-zinc-950 transition-[color,translate] group-hover:translate-x-1 group-hover:text-purple motion-reduce:transition-none"
                  >
                    →
                  </span>
                </ContentLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
