import { getTranslations } from 'next-intl/server';

import { AnchorLink } from '@/components/ui/AnchorLink';
import { RichText, inlineLinkClasses } from '@/components/ui/RichText';
import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { ProseBlock, ProseSection } from '@/types/content';

interface ProseProps {
  sections: readonly ProseSection[];
  /** Heading of the contents list, e.g. "Contents". */
  contentsLabel: string;
}

/** One content block in the prose column (styles from the existing tokens). */
function Block({ block, newTabLabel }: { block: ProseBlock; newTabLabel: string }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-body text-ink-muted">
          <RichText value={block.text} newTabLabel={newTabLabel} />
        </p>
      );
    case 'subheading':
      return <h3 className="text-title-18 text-zinc-950">{block.text}</h3>;
    case 'list':
      return (
        <ul className="space-y-2">
          {block.items.map((item, index) => (
            <li key={index} className="relative pl-5 text-body text-ink-muted">
              {/* 6x6px purple square marker, as in the About accordion. */}
              <span aria-hidden="true" className="absolute top-2.75 left-0 size-1.5 bg-purple" />
              <RichText value={item} newTabLabel={newTabLabel} />
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        // Scrolls horizontally inside its own wrapper on small screens; focusable for keyboards.
        <div role="region" aria-label={block.caption} tabIndex={0} className="overflow-x-auto">
          <table className="w-full min-w-140 border-collapse border border-navy/15 text-left">
            <caption className="sr-only">{block.caption}</caption>
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="border border-navy/15 bg-cloud px-4 py-3 align-bottom text-eyebrow font-bold tracking-caps-12 text-zinc-950"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-navy/15 px-4 py-3 align-top text-body-sm-relaxed text-ink-muted first:font-bold first:text-zinc-950"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/**
 * Text page body (Privacy, Cookies and future text pages). White, 96px vertical padding, a
 * 720px reading column aligned with the start of the 1136px inner width. A contents list links to
 * each H2 (smooth scroll + focus via AnchorLink). H2 ExtraBold 24/32 (48px above, none on the
 * first), H3 Bold 18/28, text 16/28 ink-muted with 16px between blocks.
 */
export async function Prose({ sections, contentsLabel }: ProseProps) {
  const t = await getTranslations('a11y');
  const newTabLabel = t('newTab');

  return (
    <Section width="inner" className="bg-white py-16 lg:py-24">
      <div className="max-w-180">
        <nav aria-labelledby="prose-contents" className="mb-12 border-b border-navy/15 pb-10">
          <SectionLabel id="prose-contents" tracking="wide" className="font-bold text-purple">
            {contentsLabel}
          </SectionLabel>
          <ol className="mt-5 space-y-2">
            {sections.map((section) => (
              <li key={section.id} className="text-body-sm">
                <AnchorLink href={`#${section.id}`} className={inlineLinkClasses}>
                  {section.heading}
                </AnchorLink>
              </li>
            ))}
          </ol>
        </nav>

        {sections.map((section, index) => (
          <section key={section.id} aria-labelledby={section.id} className={index ? 'mt-12' : ''}>
            <h2 id={section.id} className="scroll-mt-6 text-title-24 font-extrabold text-zinc-950">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.blocks.map((block, blockIndex) => (
                <Block key={blockIndex} block={block} newTabLabel={newTabLabel} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
