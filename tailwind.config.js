const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        zinc: colors.neutral,
        // Primary colors
        primary: colors.blue,
        // Neutral colors for text and backgrounds
        neutral: colors.neutral,
        // Accent colors
        accent: {
          ...colors.amber,
          primary: colors.amber[500],
          secondary: colors.amber[400]
        },
        // Semantic colors
        success: colors.green[500],
        warning: colors.yellow[500],
        error: colors.red[500],
        info: colors.blue[500],
        // Dark mode specific colors
        dark: {
          bg: '#121212',
          card: '#1E1E1E',
          border: '#2E2E2E'
        },
        // Light mode specific colors
        light: {
          bg: colors.white,
          card: colors.gray[50],
          border: colors.gray[200]
        }
      },
      fontFamily: {
        // to change, update font in _document.js
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-lora)", ...defaultTheme.fontFamily.serif],
        stock: [defaultTheme.fontFamily.sans]
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")]
};
