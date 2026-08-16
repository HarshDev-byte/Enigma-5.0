import type { Metadata, Viewport } from 'next';
import { Orbitron, JetBrains_Mono, Rajdhani } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#030508',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ENIGMA 5.0 — GENESIS: BEYOND THE FUTURE',
  description:
    'The year is 2097. Humanity built hyper-intelligent systems, but they are beginning to fail. Enter ENIGMA 5.0, activate Genesis, and rebuild Health, Finance, and Sustainability systems.',
  keywords: [
    'Enigma 5.0',
    'Genesis',
    'Cyberpunk Hackathon',
    '2097',
    'Health Tech',
    'Autonomous Finance',
    'Sustainability',
    'Next-Gen Architects',
  ],
  authors: [{ name: 'ENIGMA Architectural Council' }],
  openGraph: {
    title: 'ENIGMA 5.0 — GENESIS: BEYOND THE FUTURE',
    description: 'What will you build when you get the chance to create it again?',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENIGMA 5.0 — GENESIS: BEYOND THE FUTURE',
    description: 'What will you build when you get the chance to create it again?',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${jetbrainsMono.variable} ${rajdhani.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#030508] text-[#f0f6fc] font-mono selection:bg-[#00f0ff] selection:text-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
