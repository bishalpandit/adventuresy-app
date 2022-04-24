module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-800': '#0A0B0E',
      },
      fontFamily: {
        body: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "serif"],
        roboto: ["Roboto", "serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}