/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          blue: '#0d2b4e',
          gold: '#d4af37',
          purple: '#667eea',
          gradient1: '#667eea',
          gradient2: '#764ba2',
        },
      },
      fontFamily: {
        arabic: ['Tajawal', 'Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
        naskh: ['Noto Naskh Arabic', 'serif'],
      },
    },
  },
  plugins: [],
}
