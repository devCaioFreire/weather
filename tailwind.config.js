/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        blur: 'background-image: linear-gradient(to right, #4C6E8E40, #F0F5F210)'
      }
    },
  },
  plugins: [],
}

