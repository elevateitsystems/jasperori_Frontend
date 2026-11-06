'use client';

import type { MouseEvent, ReactNode } from 'react';

import type { AnchorHref } from '@/types/content';

interface AnchorLinkProps {
  /** '#id' of a section on the same page. */
  href: AnchorHref;
  className?: string;
  children: ReactNode;
}

/**
 * Link to a section on the same page. Scrolls there smoothly (instantly with reduced motion) and
 * moves keyboard focus to the section's first heading, so keyboard and screen-reader users land
 * in the right place. Without JavaScript it is a normal fragment link.
 */
export function AnchorLink({ href, className, children }: AnchorLinkProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

    const heading = target.matches('h1, h2, h3') ? target : target.querySelector('h1, h2, h3');
    const focusTarget = heading instanceof HTMLElement ? heading : target;
    if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({ preventScroll: true });

    window.history.pushState(null, '', href);
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
