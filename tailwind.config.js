/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsla(0, 0%, 8%)',
        secondary: 'hsla(259, 100%, 65%)',
        'light-red': 'hsla(0, 100%, 67%)',
        'smokey-grey': 'hsla(0, 1%, 44%)',
        'light-grey': 'hsl(0, 0%, 86%)'
      },
      backgroundColor: {
        white: 'hsla(0, 0%, 100%)',
        'off-white': 'hsla(0, 0%, 94%)'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
}
