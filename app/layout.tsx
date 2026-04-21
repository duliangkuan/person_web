import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const noto = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DU'S_VIBE_SPACE // Private Consciousness Terminal",
  description:
    "AI Architect & Commercial Lead. OpenClaw contributor, Vibe Coding geek, EasyModel ML founder. Private digital consciousness terminal.",
  keywords: [
    'Du Fengyun',
    '杜亮宽',
    'AI Architect',
    'OpenClaw',
    'EasyModel ML',
    'Vibe Coding',
    'Portfolio',
  ],
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrains.variable} ${noto.variable}`}>
      <body className="font-sans text-bone antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
