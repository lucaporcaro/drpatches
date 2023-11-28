/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app", "pages", "components"].map(
    (directory) => `./${directory}/**/*.{js,ts,jsx,tsx,mdx}`
  ),
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        primary: {
          1: "#F3CC10",
        },
      },
      keyframes: {
        navbar: {
          from: {
            left: "-160px",
          },
          to: {
            left: "0px",
          },
        },
      },
      animation: {
        "show-navbar": "navbar .3s ease forwards",
      },
      maxWidth: {
        "9xl": 1920,
      },
    },
  },
  plugins: [],
};
