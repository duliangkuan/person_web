import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        abyss: '#FAF8F5',
        ink: '#1F2430',
        grid: '#E6E3DD',
        retina: '#D97757',
        electro: '#5B8DEF',
        cursorGreen: '#D97757',
        bone: '#1F2430',
        soft: '#5B6472',
        line: '#E6E3DD',
        paper: '#FAF8F5',
        card: '#FFFFFF',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
        sans: ['var(--font-plex)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        hans: ['var(--font-noto)', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        retina: '0 12px 28px -18px rgba(217, 119, 87, 0.55)',
        electro: '0 12px 28px -18px rgba(91, 141, 239, 0.45)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.85' },
          '50%': { opacity: '0.2' },
          '55%': { opacity: '0.9' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blinkCursor: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        glitchShift: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        flicker: 'flicker 4s infinite',
        scanline: 'scanline 8s linear infinite',
        blinkCursor: 'blinkCursor 1s step-end infinite',
        glitchShift: 'glitchShift 0.3s steps(4) infinite',
        pulseRing: 'pulseRing 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
