import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        system: {
          ink: 'var(--system-ink)',
          panel: 'var(--system-panel)',
          neon: '#2f80ff',
          ice: '#4cc9ff',
          shadow: '#8b3dff',
          text: 'var(--system-text)',
          muted: 'var(--system-muted)',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 12px rgba(47, 128, 255, 0.45), 0 0 32px rgba(76, 201, 255, 0.18)',
        shadow: '0 0 12px rgba(139, 61, 255, 0.5), 0 0 32px rgba(139, 61, 255, 0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config
