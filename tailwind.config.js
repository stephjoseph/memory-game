/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-yellow": "#FDA214",
        "light-steel-blue": "#BCCED9",
        "dark-slate-blue": "#304859",
        "midnight-blue": "#152938",
        "light-grey": "#F2F2F2",
        "steel-blue": "#7191A5",
        "sky-blue": "#6395B8",
        "snow-white": "#FCFCFC",
      },
    },
  },
  plugins: [],
};
