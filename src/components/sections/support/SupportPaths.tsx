import { Section } from '@/components/ui/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import type { SupportPageContent } from '@/types/content';

interface SupportPathsProps {
  content: SupportPageContent['paths'];
}

/**
 * Redesigned Support Page (Clean layout matching client reference itakut.se)
 * Replaced the two dark cards with a clean side-by-side layout:
 * Left: Contact info + Text
 * Right: Contact Form
 */
export function SupportPaths({ content }: SupportPathsProps) {
  return (
    <Section labelledBy="support-paths-title" width="inner" className="bg-white py-20 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        
        {/* Left Column: Text and Contact Information */}
        <div className="flex flex-col justify-start">
          <SectionLabel tracking="wide" className="text-purple">
            {content.label}
          </SectionLabel>
          <h2 id="support-paths-title" className="mt-6 text-h2-xl-none text-zinc-950">
            {content.title}
          </h2>
          <p className="mt-6 text-body-loose text-ink-muted max-w-lg">
            {content.text}
          </p>

          {/* Contact Info Section */}
          <div className="mt-10 flex flex-col gap-4 text-body text-ink-muted">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-950">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="text-zinc-950 font-medium">support@jasperori.com</span>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-cloud text-zinc-950 transition-colors hover:bg-navy hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-cloud text-zinc-950 transition-colors hover:bg-navy hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (Clean Layout) */}
        <div className="flex flex-col">
          <form className="flex flex-col gap-4" action="#" method="POST">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full rounded-sm border border-line bg-white px-4 py-3 text-body text-zinc-950 placeholder:text-ink-muted focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full rounded-sm border border-line bg-white px-4 py-3 text-body text-zinc-950 placeholder:text-ink-muted focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple"
            />
            <textarea 
              placeholder="Message" 
              rows={5}
              className="w-full resize-none rounded-sm border border-line bg-white px-4 py-3 text-body text-zinc-950 placeholder:text-ink-muted focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple"
            ></textarea>
            
            {/* Submit Button matching brand colors */}
            <button 
              type="submit" 
              className="mt-2 flex w-fit items-center justify-center rounded-sm bg-purple px-8 py-3 text-button text-white transition-colors hover:bg-navy focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
            >
              Submit Request
            </button>
          </form>
        </div>

      </div>
    </Section>
  );
}