import type { Metadata } from 'next';
import './globals.css';

// Font: Manrope will be set up with next/font in the next phase.

export const metadata: Metadata = {
  title: 'TechSalem',
  description: 'TechSalem – technology and business consulting.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
