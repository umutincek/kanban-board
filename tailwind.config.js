/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000112",
        darkBg: "#20212C",
        darkGrey: "#262626",
        linesDark: "#3E3F4E",
        mediumGrey: "#828FA3",
        linesLight: "#E4EBFA",
        white: "#FFFFFF",
        purple: "#635FC7",
        purpleHover: "#A8A4FF",
        pink: "#C340A1",
        pinkHover: "#C156A5",
        periwinkle: "#6A6DCD",
        orange: "#D93535",
        blue: "#307FE2",
        green: "#00A88B",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        hS: "12px",
        bL: "14px",
        hM: "16px",
        hL: "18px",
        hXL: "22px",
      },
      lineHeight: {
        S: "15px",
        M: "19px",
        L: "23px",
        XL: "30px",
      },
      letterSpacing: {
        S: "2.4px",
      },
      rounded: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
