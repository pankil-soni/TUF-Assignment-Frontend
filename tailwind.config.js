/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js",
  ],
  theme: {
    extend: {},
  },
  darkmode: "class",
  plugins: [nextui()],
};
