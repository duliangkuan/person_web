import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        abyss: '#000000',
        ink: '#0A0A0A',
        grid: '#0F1411',
        retina: '#00FF41',
        electro: '#7024FF',
        cursorGreen: '#00FF66',
        bone: '#D7E3DB',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        hans: ['var(--font-noto)', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        retina: '0 0 24px rgba(0, 255, 65, 0.35), 0 0 2px rgba(0, 255, 65, 0.9)',
        electro: '0 0 40px rgba(112, 36, 255, 0.45), 0 0 2px rgba(112, 36, 255, 0.9)',
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
