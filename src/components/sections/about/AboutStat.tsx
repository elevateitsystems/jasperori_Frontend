import { CroppedImage } from '@/components/ui/CroppedImage';
import type { AboutPageContent } from '@/types/content';

interface AboutStatProps {
  content: AboutPageContent['stat'];
}

/**
 * About image with the "100%" stat (spec: "Section", 1600x560). Full-width photo with a black
 * 15% -> 0% overlay (left to right) and a 256x160 red box (36px padding) in the bottom-right corner.
 */
export function AboutStat({ content }: AboutStatProps) {
  return (
    <div className="relative isolate h-80 overflow-hidden md:h-105 lg:h-140">
      <div className="absolute inset-0 -z-20">
        <CroppedImage image={content.image} sizes="100vw" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-overlay-about-quote" />
      <div className="absolute right-0 bottom-0 w-64 bg-red p-9">
        <p className="text-h2 tracking-tight-6 text-white">{content.value}</p>
        <p className="mt-2 text-eyebrow tracking-caps-18 text-white">{content.label}</p>
      </div>
    </div>
  );
}
