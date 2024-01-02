/** @type {import('tailwindcss').Config} */
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
      colors: {
        'primary': '#DDDDDD',
        'secondary': '#EB5958',
        'btg-dark-grey': '#5E5E5E',
        'btg-light-grey': '#DDDDDD',
        'btg-red': '#EB5958',
        'btg-green': '#2CBE3A',
        'btg-yellow': '#FFC700'
      }, 

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

// colors: {
//   'primary-color': '#DDDDDD',
//   'secondary-color': '#EB5958',
//   'btg-dark-grey': '#5E5E5E',
//   'btg-light-grey': '#DDDDDD',
//   'btg-red': '#EB5958',
//   'btg-green': '#2CBE3A',
//   'btg-yellow': '#FFC700'
// }