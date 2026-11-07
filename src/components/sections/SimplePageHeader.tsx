import { SquareEyebrow } from '@/components/ui/SquareEyebrow';
import type { SimplePageHeaderContent } from '@/types/content';

interface SimplePageHeaderProps {
  content: SimplePageHeaderContent;
  /** Id of the H1 (aria-labelledby). */
  id: string;
}

/**
 * Compact page header for text pages without a design (Privacy, Cookies, 404). Built from the
 * existing design language: navy band, the "simple" hero eyebrow, the 60px h2-xl style for the
 * H1 (max 896px) and an optional 16/28 line at white/65. 96px top / 80px bottom padding
 * (64/48 on small screens), content aligned with the 1136px inner width.
 */
export function SimplePageHeader({ content, id }: SimplePageHeaderProps) {
  return (
    <section aria-labelledby={id} className="bg-navy pt-16 pb-12 lg:pt-24 lg:pb-20">
      <div className="site-container">
        <div className="mx-auto max-w-inner">
          <SquareEyebrow>{content.eyebrow}</SquareEyebrow>
          <h1 id={id} className="mt-7 max-w-224 text-h2-xl text-white">
            {content.title}
          </h1>
          {content.text ? (
            <p className="mt-6 max-w-144 text-body text-white/65">{content.text}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
