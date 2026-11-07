import { Fragment } from 'react';

import { ContentLink } from '@/components/ui/ContentLink';
import type { RichText as RichTextValue } from '@/types/content';

interface RichTextProps {
  value: RichTextValue;
  /** Screen-reader text for links that open in a new tab. */
  newTabLabel: string;
}

/** Link style in text: purple, underlined (3px offset), darker on hover. */
export const inlineLinkClasses =
  'text-purple underline underline-offset-3 transition-colors hover:text-navy';

/** Renders content text with inline links (strings and LinkItems), no raw HTML. */
export function RichText({ value, newTabLabel }: RichTextProps) {
  if (typeof value === 'string') return value;
  return value.map((part, index) =>
    typeof part === 'string' ? (
      <Fragment key={index}>{part}</Fragment>
    ) : (
      <ContentLink
        key={index}
        link={part}
        newTabLabel={newTabLabel}
        className={inlineLinkClasses}
      />
    ),
  );
}
