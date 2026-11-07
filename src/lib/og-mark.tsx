/**
 * The logo mark (the X) as a plain SVG element for ImageResponse (Open Graph images, apple icon).
 * Same geometry as src/components/ui/Logo.tsx and src/app/icon.svg. Colors are the brand tokens
 * (ImageResponse cannot read CSS variables): navy #17233F, purple #5136A5, red #EF1747.
 */
export function LogoMark({ size, square = '#17233F' }: { size: number; square?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <rect width="36" height="36" rx="4" fill={square} />
      <rect x="14" y="6" width="8" height="24" transform="rotate(45 18 18)" fill="#5136A5" />
      <rect x="14" y="6" width="8" height="24" transform="rotate(-45 18 18)" fill="#EF1747" />
    </svg>
  );
}
