import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "840px",
      // => @media (min-width: 840px) { ... }
      lg: "1240px",
      // => @media (min-width: 1240px) { ... }
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "4xl": "2rem",
      "5xl": "3rem",
      full: "9999px",
    },
    extend: {
      fontFamily: {
        sans: ["NanumSquareNeo-Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
