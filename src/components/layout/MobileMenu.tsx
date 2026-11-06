'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from 'react';

import { usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

/** Same as Tailwind's `lg` breakpoint: from here on the desktop header is shown. */
const DESKTOP_QUERY = '(min-width: 64rem)';

interface MobileMenuProps {
  /** Panel content (navigation, language switch, CTA), rendered on the server. */
  children: ReactNode;
}

/**
 * Menu button + full-width panel for screens below `lg`.
 * - aria-expanded / aria-controls on the button; Escape closes and returns focus to the button.
 * - When it opens, focus moves to the first link; the page behind can't scroll and is made inert
 *   (elements marked with data-menu-inert), so keyboard focus can't reach hidden content.
 * - Closes when a link is clicked, when the route changes and when the screen grows to desktop.
 */
export function MobileMenu({ children }: MobileMenuProps) {
  const t = useTranslations('a11y');
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Remember on which page the menu was opened: a route change closes it without an effect.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const isOpen = openOnPath === pathname;

  const close = (returnFocus: boolean) => {
    setOpenOnPath(null);
    if (returnFocus) buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const background = document.querySelectorAll<HTMLElement>('[data-menu-inert]');
    background.forEach((element) => {
      element.inert = true;
    });

    panelRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenOnPath(null);
      buttonRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpointChange = () => {
      if (desktop.matches) setOpenOnPath(null);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpointChange);

    return () => {
      root.style.overflow = previousOverflow;
      background.forEach((element) => {
        element.inert = false;
      });
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpointChange);
    };
  }, [isOpen]);

  const onPanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest('a')) close(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? t('closeMenu') : t('openMenu')}
        onClick={() => (isOpen ? close(false) : setOpenOnPath(pathname))}
        className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-sm text-navy lg:hidden"
      >
        {isOpen ? (
          <XIcon aria-hidden="true" className="size-6" strokeWidth={1.75} />
        ) : (
          <MenuIcon aria-hidden="true" className="size-6" strokeWidth={1.75} />
        )}
      </button>

      {/* The click handler only closes the menu after a link was activated (Enter on a link fires
          a click too), so it adds no interaction of its own. */}
      <div
        id={panelId}
        ref={panelRef}
        onClick={onPanelClick}
        className={cn(
          'absolute inset-x-0 top-full h-[calc(100dvh-var(--spacing-header))] overflow-y-auto border-t border-line bg-white lg:hidden',
          'duration-200 ease-out motion-reduce:transition-none',
          // Opening: visible at once (so focus can move in), then fade/slide in.
          // Closing: fade/slide out, and only become hidden when the transition has finished.
          isOpen
            ? 'visible translate-y-0 opacity-100 transition-[opacity,translate]'
            : 'invisible -translate-y-2 opacity-0 transition-[opacity,translate,visibility]',
        )}
      >
        {children}
      </div>
    </>
  );
}
