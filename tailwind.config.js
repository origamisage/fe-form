/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          marine: "hsl(213, 96%, 18%)",
          purplish: "hsl(243, 100%, 62%)",
          pastel: "hsl(228, 100%, 84%)",
          light: "hsl(206, 94%, 87%)",
          back: "#EEF5FF",
          active: "#164A8B",
        },
        red: {
          strawberry: "hsl(354, 84%, 57%)",
        },
        gray: {
          cool: "hsl(231, 11%, 63%)",
          light: "hsl(229, 24%, 87%)",
        },
        magnolia: "hsl(217, 100%, 97%)",
        alabaster: "hsl(231, 100%, 99%)",
      },
      fontFamily: {
        sans: ["var(--font-ubuntu)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/forms"),
    require("tailwindcss-radix")(),
  ],
};
