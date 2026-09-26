import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#050506', 900: '#0a0a0b', 850: '#0d0e0f', 800: '#111214', 700: '#17181b', 600: '#202226' },
        line: { DEFAULT: 'rgba(255,255,255,.09)', strong: 'rgba(255,255,255,.18)' },
        fg: { DEFAULT: '#ecebe7', dim: '#c4c3be', mute: '#8c8d92' },
        brand: { DEFAULT: '#ff6a1a', deep: '#e8590c', soft: 'rgba(255,106,26,.14)', line: 'rgba(255,106,26,.42)' },
        steel: { light: '#e9ecf0', mid: '#9aa1ab', dark: '#5a606a' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        eyebrow: ['clamp(.68rem,.64rem + .16vw,.78rem)', { letterSpacing: '.22em', lineHeight: '1.2' }],
        lead: ['clamp(1.05rem,.98rem + .5vw,1.35rem)', { lineHeight: '1.55' }],
        h3: ['clamp(1.3rem,1.1rem + .9vw,1.9rem)', { lineHeight: '1.12', letterSpacing: '-.025em' }],
        h2: ['clamp(2.1rem,1.3rem + 3.6vw,4.6rem)', { lineHeight: '.95', letterSpacing: '-.04em' }],
        h1: ['clamp(2.75rem,1.4rem + 6.4vw,8.25rem)', { lineHeight: '.9', letterSpacing: '-.045em' }],
        mega: ['clamp(4rem,2rem + 12vw,15rem)', { lineHeight: '.82', letterSpacing: '-.06em' }],
      },
      maxWidth: { shell: '1440px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(.16,1,.3,1)',
        inout: 'cubic-bezier(.65,0,.35,1)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        ping: {
          '0%': { transform: 'scale(1)', opacity: '.7' },
          '70%,100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        hint: {
          '0%,100%': { transform: 'scaleY(.3)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        sheen: { '0%': { transform: 'translateX(-120%)' }, '60%,100%': { transform: 'translateX(220%)' } },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        ping: 'ping 2.4s cubic-bezier(.16,1,.3,1) infinite',
        hint: 'hint 2.2s cubic-bezier(.65,0,.35,1) infinite',
        sheen: 'sheen 5.5s cubic-bezier(.65,0,.35,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
