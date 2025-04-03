/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tektur: ['Tektur', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.25)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.25)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '200%': '200% 200%',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-lg': {
          textShadow: '0 2px 15px rgba(0, 0, 0, 0.25)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
