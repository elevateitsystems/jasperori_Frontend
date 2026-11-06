'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Kind = 'color' | 'text' | 'shadow' | 'radius' | 'background';

interface ComputedValueProps {
  kind: Kind;
  className?: string;
  children?: ReactNode;
}

function describe(style: CSSStyleDeclaration, kind: Kind): string {
  switch (kind) {
    case 'color':
      return style.backgroundColor;
    case 'background':
      return style.backgroundImage;
    case 'shadow':
      return style.boxShadow;
    case 'radius':
      return style.borderRadius;
    case 'text':
      return [
        `${style.fontSize} / ${style.lineHeight}`,
        `ls ${style.letterSpacing}`,
        `weight ${style.fontWeight}`,
        style.textTransform !== 'none' ? style.textTransform : null,
        style.fontFamily.split(',')[0],
      ]
        .filter(Boolean)
        .join(' · ');
  }
}

/**
 * Dev tokens page only: renders an element with the given classes and prints its computed CSS
 * values underneath, so token values can be checked against the spec in the browser.
 */
export function ComputedValue({ kind, className, children }: ComputedValueProps) {
  const measure = (element: HTMLDivElement | null) => {
    const output = element?.nextElementSibling;
    if (!element || !output) return;
    output.textContent = describe(getComputedStyle(element), kind);
  };

  return (
    <div>
      <div ref={measure} className={cn(className)}>
        {children}
      </div>
      <code className="mt-2 block text-caption break-all text-ink-muted" />
    </div>
  );
}
