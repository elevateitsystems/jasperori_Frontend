import { CroppedImage } from '@/components/ui/CroppedImage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { ContactPageContent } from '@/types/content';

interface ContactDirectProps {
  content: ContactPageContent['direct'];
}

/**
 * Contact "02 / Direct contact" (spec: "Frame 2147240641", 560px tall). The Figma frame is 1630px
 * wide and cut off at 1600px; we build what is visible: the 814px photo (50.875%) and the red
 * panel filling the rest to the screen edge, proportionally from `lg` up. Panel: 64px left
 * padding, 487px content, vertically centred (the content is 292px tall, as in the spec).
 * Below `lg` the photo sits above the panel.
 */
export function ContactDirect({ content }: ContactDirectProps) {
  return (
    <section aria-labelledby="contact-direct-title" className="grid lg:grid-cols-[814fr_786fr]">
      <div className="relative aspect-814/560 overflow-hidden lg:aspect-auto lg:h-140">
        <CroppedImage image={content.image} sizes="(min-width: 1024px) 51vw, 100vw" />
      </div>
      <div className="flex items-center bg-red px-6 py-14 [--focus-ring:var(--color-white)] md:p-14 lg:h-140 lg:p-16">
        <div className="w-full max-w-121.75">
          <SectionLabel className="font-bold text-white/55">{content.label}</SectionLabel>
          <h2 id="contact-direct-title" className="mt-9 text-h2 tracking-tight-5 text-white">
            {content.title}
          </h2>
          <p className="mt-6 text-body-loose text-white/70">{content.text}</p>
          <dl className="mt-12 grid gap-5 border-t border-white/25 pt-7">
            {content.facts.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-6 text-body-sm">
                <dt className="text-white/55">{fact.label}</dt>
                <dd className="text-right text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
