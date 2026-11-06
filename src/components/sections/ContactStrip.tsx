import { getTranslations } from 'next-intl/server';

import { ContentLink } from '@/components/ui/ContentLink';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SplitHeading } from '@/components/ui/SplitHeading';
import type { ContactStripContent } from '@/types/content';

interface ContactStripProps {
  content: ContactStripContent;
  /** Unique heading id per page. */
  id: string;
}

/**
 * "04 / Contact" strip (spec: About "CorporatePage"; also on Services). White, 128px vertical
 * padding, 1136px inner width, two 544px columns with a 48px gap. Right: three full-row links,
 * 61px each (20px padding + 1px divider) under a 1px top border, navy at 15%.
 */
export async function ContactStrip({ content, id }: ContactStripProps) {
  const t = await getTranslations('a11y');

  return (
    <Section labelledBy={id} width="inner" className="bg-white py-20 lg:py-32">
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
        <div>
          <SectionLabel tracking="wide" className="text-ink-muted">
            {content.label}
          </SectionLabel>
          <SplitHeading
            id={id}
            content={content}
            className="mt-7 text-h2-xl text-zinc-950"
            accentClassName="text-purple"
          />
        </div>

        <ul className="border-t border-navy/15">
          {content.rows.map((row) => (
            <li key={row.label} className="border-b border-navy/15">
              <ContentLink
                link={row.link}
                newTabLabel={t('newTab')}
                className="group flex items-center justify-between gap-6 py-5 text-button"
              >
                <span className="text-ink-muted">{row.label}</span>
                <span className="text-right text-zinc-950 transition-colors group-hover:text-purple">
                  {row.link.label}
                </span>
              </ContentLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
