import { getLocale } from 'next-intl/server';

import { AboutBelief } from '@/components/sections/about/AboutBelief';
import { AboutCapabilities } from '@/components/sections/about/AboutCapabilities';
import { AboutStat } from '@/components/sections/about/AboutStat';
import { AboutValues } from '@/components/sections/about/AboutValues';
import { ContactStrip } from '@/components/sections/ContactStrip';
import { PageHero } from '@/components/sections/PageHero';
import { Perspective } from '@/components/sections/Perspective';
import { getContent } from '@/content';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('about');
}

export default async function AboutPage() {
  const locale = await getLocale();
  const [about, contactStrip] = await Promise.all([
    getContent(locale, 'about'),
    getContent(locale, 'contactStrip'),
  ]);

  return (
    <>
      <PageHero content={about.hero} overlay="about" id="about-hero-title" />
      <Perspective content={about.perspective} id="about-perspective-title" labelSize="lg" />
      <AboutStat content={about.stat} />
      <AboutValues content={about.values} />
      <AboutCapabilities content={about.capabilities} />
      <AboutBelief content={about.quote} />
      <ContactStrip content={contactStrip} id="about-contact-title" />
    </>
  );
}
