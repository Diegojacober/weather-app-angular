/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#181818",
        "weather-secondary": "#36085B",
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

