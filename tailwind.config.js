/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF9',
          100: '#FBF8F5',
          200: '#F5ECE5',
          300: '#EADFD7',
          400: '#D8C7BC',
        },
        terracotta: {
          50: '#FDF6F6',
          100: '#F7EBEB',
          200: '#EBD4D4',
          300: '#D5A7A7',
          400: '#B87D7D',
          500: '#A66363',
          600: '#8D5050',
          700: '#743E3E',
          800: '#5A3030',
          900: '#422222',
        },
        warm: {
          dark: '#2E221D',
          text: '#3E2F28',
          muted: '#7A665A',
          subtle: '#A8978B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(116, 62, 62, 0.04)',
        'warm': '0 4px 20px rgba(116, 62, 62, 0.07)',
        'warm-lg': '0 12px 32px rgba(116, 62, 62, 0.12)',
      }
    },
  },
  plugins: [],
}
