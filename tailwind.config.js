/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Tailwind scan đúng trong src/
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
        playwrite: ['Playwrite US Trad', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        satisfy: ['Satisfy', 'cursive']
      },
      colors: {
        peach: '#fff8f5'
      },
      fontSize: {
        xxs: '10px'
      },
    },
  },
  plugins: [],
};
