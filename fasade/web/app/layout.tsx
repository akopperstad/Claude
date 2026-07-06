import type { Metadata } from 'next';
import { Schibsted_Grotesk } from 'next/font/google';
import { Beacon } from '@/components/Beacon';
import './tokens.css';
import './globals.css';

// Én tekstfont + system-mono (DESIGN-SPEC §2.2). Schibsted Grotesk støtter
// latin + latin-ext (ø å æ); bundles ved build — ingen runtime-CDN.
const sans = Schibsted_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Vøling — Se boligen din i ny drakt',
  description:
    'Last opp ett bilde av boligen, velg nivå, og få fotorealistiske visualiseringer på sekunder. Fra ny farge til full forvandling.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={sans.variable}>
      <body>
        <Beacon />
        {children}
      </body>
    </html>
  );
}
