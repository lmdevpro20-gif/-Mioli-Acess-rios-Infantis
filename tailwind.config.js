/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          50:  '#f0eaff',
          100: '#e0d4ff',
          200: '#c4aaff',
          300: '#a57eff',
          400: '#8a56ff',
          500: '#7034f0',
          600: '#5a1fd1',
          700: '#4716a8',
          800: '#350f80',
          900: '#240a5c',
        },
        'dk': {
          bg:      'rgb(var(--dk-bg) / <alpha-value>)',
          surface: 'rgb(var(--dk-surface) / <alpha-value>)',
          card:    'rgb(var(--dk-card) / <alpha-value>)',
          card2:   'rgb(var(--dk-card2) / <alpha-value>)',
          border:  'rgb(var(--dk-border) / <alpha-value>)',
          border2: 'rgb(var(--dk-border2) / <alpha-value>)',
          text:    'rgb(var(--dk-text) / <alpha-value>)',
          muted:   'rgb(var(--dk-muted) / <alpha-value>)',
          hover:   'rgb(var(--dk-hover) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
