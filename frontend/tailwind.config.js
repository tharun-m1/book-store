/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(37, 99, 235)",
        secondary: "rgb(219, 234, 254)",
      },
      fontFamily: {
        primary: ["openSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
