import type { Metadata } from 'next';
import './tokens.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vøling — Se boligen din i ny drakt',
  description:
    'Last opp ett bilde av boligen, velg nivå, og få fotorealistiske visualiseringer på sekunder. Fra ny farge til full forvandling.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  );
}
