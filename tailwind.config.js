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
  screens: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '976px',
    xl: '1440px',
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}