/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 5s ease-in-out'
      },
      classNames: {
        error: 'text-xs text-red-600 text-left'
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') }
        }
      })
    }
  },
  plugins: [require('flowbite/plugin')]
}
