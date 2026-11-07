import { getLocale } from 'next-intl/server';

import { ContactStrip } from '@/components/sections/ContactStrip';
import { PageHero } from '@/components/sections/PageHero';
import { Perspective } from '@/components/sections/Perspective';
import { ServicesGrid } from '@/components/sections/services/ServicesGrid';
import { ServicesNextStep } from '@/components/sections/services/ServicesNextStep';
import { ServicesProcess } from '@/components/sections/services/ServicesProcess';
import { getContent } from '@/content';
import { imageCrops } from '@/lib/image-crops';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('services');
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const [services, contactStrip] = await Promise.all([
    getContent(locale, 'services'),
    getContent(locale, 'contactStrip'),
  ]);

  return (
    <>
      <PageHero
        content={services.hero}
        layout="simple"
        overlay="services"
        crop={imageCrops.servicesHero}
        darken
        id="services-hero-title"
      />
      <Perspective content={services.perspective} id="services-perspective-title" labelSize="sm" />
      <ServicesGrid content={services.services} />
      <ServicesProcess content={services.process} />
      <ServicesNextStep content={services.next} />
      <ContactStrip content={contactStrip} id="services-contact-title" />
    </>
  );
}
