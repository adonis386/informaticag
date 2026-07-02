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
        roboto: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0a0a0a',
          surface: '#111111',
          light: '#fcfcfc',
          muted: '#737373',
          border: '#262626',
          accent: '#3b82f6',
        },
      },
      letterSpacing: {
        widest: '0.25em',
      },
      transitionTimingFunction: {
        agency: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      },
    },
  },
  plugins: [],
}
