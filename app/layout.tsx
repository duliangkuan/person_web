import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google';
import './globals.css';

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-plex',
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
  title: "风云｜AI Builder · Co-founder & COO",
  description:
    "风云（杜亮宽）的个人站：deepseek-harness-desktop 联合创始人兼 COO、风云AI学习社发起人、数字生命卡兹克 AGORAY 成员、AI 智能体应用工程师（高级）。",
  keywords: [
    'Du Fengyun',
    '杜亮宽',
    '风云AI学习社',
    'deepseek-harness-desktop',
    'Co-founder',
    'COO',
    'AGORAY',
    'AI Architect',
    'Agent Harness',
    'LLM-as-Judge',
    'AutoVideo',
    'OpenClaw',
    'Vibe Coding',
    'AdventureX',
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
    <html lang="zh-CN" className={`${plex.variable} ${jetbrains.variable} ${noto.variable}`}>
      <body className="font-sans text-bone antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
