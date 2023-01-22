/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        100: "#5CB85C",
      },
      secodary: {
        100: "#ccc",
        200: "#5CB85C",
        300: "#f5f5f5",
        400: "#bbb",
      },
      white: "#fff",
      gray: {
        100: "#f7fafc",
        150: "#DCDCDC",
        200: "#D3D3D3",
        300: "#C0C0C0",
        400: "#efefef",
        500: "#ccc",
        600: "#aaa",
        700: "#555",
        800: "#707070",
        900: "#1a202c",
      },
      red: {
        50: "#fef2f2",
        500: "#ef4444",
        600: "#57534e",
      },
    },
    extend: {},
  },
  plugins: [],
};
