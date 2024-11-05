/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['night'],
  },
}
