import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import {
  colorTokens,
  gradientTokens,
  radiusTokens,
  shadowTokens,
  textStyleTokens,
  trackingTokens,
} from '@/lib/design-tokens';

import { ComputedValue } from './_components/ComputedValue';

/*
 * TEMPORARY developer page: shows every design token. Not linked anywhere, not indexed.
 * Delete the whole src/app/[locale]/dev folder in the final phase.
 * The labels below are developer notes, not site content, so they are not in src/content.
 */

export const metadata: Metadata = {
  title: 'Design tokens (dev)',
  robots: { index: false, follow: false },
};

const SAMPLE_TEXT = 'Driving business forward / Teknik med syfte, åäö ÅÄÖ';

/** Full class names so Tailwind generates them. */
const trackingClassNames: Record<(typeof trackingTokens)[number], string> = {
  'tight-5': 'tracking-tight-5',
  'tight-6': 'tracking-tight-6',
  'caps-12': 'tracking-caps-12',
  'caps-13': 'tracking-caps-13',
  'caps-15': 'tracking-caps-15',
  'caps-16': 'tracking-caps-16',
  'caps-18': 'tracking-caps-18',
  'caps-20': 'tracking-caps-20',
  'caps-22': 'tracking-caps-22',
  'caps-24': 'tracking-caps-24',
};

function TokenSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-8 text-title-24 text-navy">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignTokensPage() {
  return (
    <div className="site-container py-16">
      <h1 className="text-h2 text-navy">Design tokens</h1>
      <p className="mt-4 text-body text-ink-muted">
        Temporary page. Values come from src/app/globals.css; computed values are printed under each
        sample.
      </p>

      <TokenSection title="Colors">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {colorTokens.map((token) => (
            <li key={token.name}>
              <ComputedValue
                kind="color"
                className={cn('h-24 rounded-lg border border-line', token.className)}
              />
              <p className="mt-2 text-button">{token.name}</p>
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection title="Gradients">
        <ul className="grid gap-8 md:grid-cols-2">
          {gradientTokens.map((token) => (
            <li key={token.name}>
              <p className="mb-2 text-button">{token.className}</p>
              <ComputedValue
                kind="background"
                className={cn(
                  token.name === 'accent-bar' ? 'h-28 w-1' : 'h-32 border border-line',
                  token.name.startsWith('overlay') && 'bg-cloud',
                  token.className,
                )}
              />
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection title="Text styles">
        <ul className="flex flex-col gap-10">
          {textStyleTokens.map((token) => (
            <li key={token.name}>
              <p className="mb-2 text-micro text-purple">
                {token.className}
                {token.inter ? ' + font-inter' : ''}
              </p>
              <ComputedValue
                kind="text"
                className={cn('text-navy', token.inter && 'font-inter', token.className)}
              >
                {SAMPLE_TEXT}
              </ComputedValue>
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection title="Letter spacing overrides">
        <ul className="flex flex-col gap-6">
          {trackingTokens.map((name) => {
            const sampleStyle = name.startsWith('caps') ? 'text-eyebrow' : 'text-h2';
            return (
              <li key={name}>
                <p className="mb-2 text-micro text-purple">
                  {sampleStyle} {trackingClassNames[name]}
                </p>
                <ComputedValue
                  kind="text"
                  className={cn('text-navy', sampleStyle, trackingClassNames[name])}
                >
                  {SAMPLE_TEXT}
                </ComputedValue>
              </li>
            );
          })}
        </ul>
      </TokenSection>

      <TokenSection title="Radius">
        <ul className="flex flex-wrap gap-6">
          {radiusTokens.map((token) => (
            <li key={token.name} className="w-32">
              <ComputedValue kind="radius" className={cn('h-24 w-32 bg-purple', token.className)} />
              <p className="mt-2 text-button">{token.className}</p>
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection title="Shadows">
        <ul className="flex flex-wrap gap-10 rounded-lg bg-cloud p-10">
          {shadowTokens.map((token) => (
            <li key={token.name} className="w-56">
              <ComputedValue
                kind="shadow"
                className={cn('h-24 w-56 rounded-sm bg-white', token.className)}
              />
              <p className="mt-2 text-button">{token.className}</p>
            </li>
          ))}
        </ul>
      </TokenSection>

      <TokenSection title="Layout">
        <p className="mb-4 text-body-sm text-ink-muted">
          site-container: 1320px content, side padding 20px (375px wide) to 140px (1600px wide).
          Header height token: h-header (68px).
        </p>
        <div className="-mx-(--site-gutter) bg-lavender">
          <div className="site-container">
            <div className="h-header bg-purple/20 outline outline-purple outline-dashed" />
          </div>
        </div>
      </TokenSection>
    </div>
  );
}
