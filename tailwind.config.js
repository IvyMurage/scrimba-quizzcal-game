/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        primary: '#FFFFFF',
        secondary:'#0E103D'
      }, 
      borderWidth:{
        1: '1px'

      }
    },
  },
  plugins: [],
}

