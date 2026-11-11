import {
  BriefcaseBusiness,
  CodeXml,
  DatabaseBackup,
  LaptopMinimal,
  Printer,
  ShieldCheck,
  Wifi,
} from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Link } from '@/i18n/navigation';
import type { SupportPageContent } from '@/types/content';

const serviceIcons = [
  LaptopMinimal,
  Wifi,
  ShieldCheck,
  DatabaseBackup,
  BriefcaseBusiness,
  Printer,
  CodeXml,
] as const;

interface SupportServicesProps {
  content: SupportPageContent['services'];
}

/** Clear service cards with starting prices, following the client's existing Services page. */
export function SupportServices({ content }: SupportServicesProps) {
  return (
    <Section labelledBy="support-services-title" className="bg-cloud py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-inner">
        <div className="mx-auto max-w-160 text-center">
          <SectionLabel className="font-bold text-purple">{content.label}</SectionLabel>
          <h2 id="support-services-title" className="text-h2 text-zinc-950">
            {content.title}
          </h2>
          <p className="mt-5 text-body-sm-relaxed text-ink-muted">{content.text}</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {content.items.map((service, index) => {
            const ServiceIcon = serviceIcons[index];

            return (
              <li
                key={service.title}
                className="shadow-sm hover:shadow-md flex min-h-64 flex-col border border-line bg-white p-5 transition-shadow"
              >
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-sm bg-navy text-white"
                >
                  <ServiceIcon className="size-5" />
                </span>
                <h3 className="mt-4 text-title-18 font-bold text-zinc-950">{service.title}</h3>
                <p className="mt-2 text-body-sm text-ink-muted">{service.text}</p>
                <div className="mt-auto pt-5">
                  <p className="inline-flex rounded-sm bg-navy/55 px-3 py-1 text-caption font-bold text-white">
                    {service.price}
                  </p>
                  <Link
                    href={service.link.href}
                    className="mt-3 block w-fit text-caption font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-purple focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
                  >
                    {service.link.label}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
