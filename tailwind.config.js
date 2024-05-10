/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#353535",
        "weather-secondary": "#3c6e71",
        "white": "#ffffff",
        "weather-4": "#d9d9d9",
        "wather-5": "#284b63",
      }
    },
    fontFamily: {
      Poopins: ["Poppins", "sans-serif"]
    },
    container: {
      padding: "2rem",
      center: true
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
}

