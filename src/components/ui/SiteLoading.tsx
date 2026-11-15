import { LogoMark } from '@/components/ui/Logo';
import type { Locale } from '@/i18n/routing';

const labels = {
  en: 'Loading',
  sv: 'Laddar',
} as const;

export function loadingLabel(locale: Locale) {
  return labels[locale];
}

/** Branded wait state for route changes and pages that are still preparing. */
export function SiteLoading({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[70vh] items-center justify-center bg-cloud px-6"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-logo text-navy">TechSalem</span>
        </div>
        <div className="h-1 w-44 overflow-hidden rounded-full bg-navy/10" aria-hidden="true">
          <div className="site-loading-bar h-full rounded-full" />
        </div>
        <p className="text-caption text-ink-muted">{label}</p>
      </div>
    </div>
  );
}
