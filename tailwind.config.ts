import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        fg: 'var(--text-fg)',
        muted: 'var(--text-muted)',
        line: 'var(--border-line)',
        accent: 'var(--text-accent)',
        'accent-2': 'var(--text-accent-2)',
        error: 'var(--text-error)',
        btn: 'var(--bg-btn)',
        'on-btn': 'var(--text-on-btn)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
      },
    },
  },
  plugins: [],
} satisfies Config
