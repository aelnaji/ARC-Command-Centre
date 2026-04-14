/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'urgency-ring': 'urgencyRing 2.5s ease infinite',
        'cyan-border': 'cyanPulse 2.5s ease infinite',
        'count-up': 'countUp 1s ease-out forwards',
      },
      keyframes: {
        urgencyRing: {
          '0%,100%': { borderColor: 'rgba(245,158,11,0)' },
          '50%': { borderColor: 'rgba(245,158,11,0.22)' },
        },
        cyanPulse: {
          '0%,100%': { borderColor: 'rgba(0,212,255,0.18)' },
          '50%': { borderColor: 'rgba(0,212,255,0.50)' },
        },
      },
      colors: {
        arc: {
          bg: '#080A0F',
          sidebar: '#0B0E14',
          green: '#22c55e',
          cyan: '#00D4FF',
          amber: '#F59E0B',
          red: '#EF4444',
          emerald: '#10B981',
          gold: '#F5A623',
        },
      },
    },
  },
  plugins: [],
}
