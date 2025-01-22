/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    daisyui: {
      themes: ["Mytheme", "dark", "cupcake"],
    },
    extend: {
          colors:{
            'Mytheme': '#340065',
          }
    },
  },
  plugins: [require('daisyui'),],
}

