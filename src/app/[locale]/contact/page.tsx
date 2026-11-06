import { getLocale } from 'next-intl/server';

import { ContactDirect } from '@/components/sections/contact/ContactDirect';
import { ContactSteps } from '@/components/sections/contact/ContactSteps';
import { ContactTalk } from '@/components/sections/contact/ContactTalk';
import { PageHero } from '@/components/sections/PageHero';
import { getContent } from '@/content';
import { getPageMetadata } from '@/lib/metadata';

export function generateMetadata() {
  return getPageMetadata('contact');
}

/** Contact (spec: design/spec/contact.md). No contact strip: the steps are followed by the footer. */
export default async function ContactPage() {
  const locale = await getLocale();
  const contact = await getContent(locale, 'contact');

  return (
    <>
      <PageHero content={contact.hero} layout="simple" overlay="services" id="contact-hero-title" />
      <ContactTalk content={contact.talk} id="lets-talk" />
      <ContactDirect content={contact.direct} />
      <ContactSteps content={contact.steps} />
    </>
  );
}
