/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sager-black": "#0B0B0B",
        "sager-dark-gray": "#111111",
        "sager-light-gray": "#272727",
        "sager-lighter-gray": "#748AA1",
        "sager-active-red": "#FF0000",
        "sager-green": "#00ff00",
        "sager-red": "#ff0000",
      },
    },
  },
  plugins: [],
};
