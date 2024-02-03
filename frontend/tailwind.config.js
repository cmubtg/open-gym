/** @type {import('tailwindcss').Config} */

const themeColors = require('./src/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        inter : ['Inter', 'sans-serif'],
      },
      colors: themeColors, 

      keyframes: {
        pulsate: {
            '0%': { transform: 'scale(0.1, 0.1)', opacity: 0.0 },
            '50%': { opacity: 1.0 },
            '100%': { transform: 'scale(1.3, 1.3)', opacity: 0.0 },
        },
      },
      animation: {
          pulsate: 'pulsate 1s ease-out infinite',
      },
    },
  },
  plugins: [],
}
