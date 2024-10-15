/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '960px',
      lg: '1280px',
      xl: '1440px',
    },
    extend: {
      colors: {
        white: 'white',
        black: 'black',
        transparent: 'transparent',
        app: {
          primary: '#3498db',
          secondary: '#f1c40f',
        }
      }
    },
  },
  plugins: [],
}

