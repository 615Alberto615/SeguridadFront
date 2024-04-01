/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}", // Asegúrate de incluir la ruta correcta para tus archivos React
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#010851",
        "secondary": "#9A7AF1",
        "tartary": "#707070",
        "pink": "#EE9AE5",
      },
      boxShadow: {
        "3xl":'0 10px 50px 0px rgba(0,0,0,0.15)',
      },
      fontFamily: {
        
      },
    },
  },
  plugins: [],
}

