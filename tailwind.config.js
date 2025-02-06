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
          },
          backgroundImage: {
             'people': "url('/src/assets/image.png')",
            'editprofile': "url('/src/assets/bg-editprofile.avif')",
           
          }
    },
  },
  plugins: [require('daisyui'),],
}

