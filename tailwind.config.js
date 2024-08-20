/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-color-1': '#bababa',
        'theme-color-2': '#036564',
        'theme-color-3': '#033649',
        'paypal-resolution-blue': '#003087',
        'paypal-cerulean': '#009cde',
        'paypal-midnight-blue': '#012169',
        'visa-lucky-point': '#1a1f71',
        'visa-selective-yellow': '#f7b600'
      },
      fontFamily: {
        'quicksand': ['QuickSand', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'paypal-sans': ['Paypal-Sans', 'sans-serif'],
        'visa-dialect': ['Visa-Dialect', 'sans-serif']
      },
    },
  },
  plugins: []
}



