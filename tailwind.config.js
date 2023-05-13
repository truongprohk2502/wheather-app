/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        primary: "#00668A",
        secondary: "#004E71",
      },
    },
    fontFamily: {
      roboto: ["Roboto, sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
