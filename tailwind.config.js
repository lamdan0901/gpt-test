/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    screens: {
      xxs: { max: '375px' },
      xs: '475px',
      sm: '640px',
      md: '768px',
      xmd: { min: '768px', max: '818px' },
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        gray: {
          100: '#F9F9FB',
          200: '#F3F4F8',
          250: '#F2F2F2',
          300: '#D2D4DA',
          350: '#B3B5BD',
          400: '#9496A1',
          500: '#777986',
          600: '#5B5D6B',
          700: '#404252',
          800: '#2d3748',
          900: '#101223',
        },
        purple: { DEFAULT: '#5A4CDB', 200: '#f7f6ff', 300: '#e1ddfe' },
      },
    },
  },
  plugins: [],
};
