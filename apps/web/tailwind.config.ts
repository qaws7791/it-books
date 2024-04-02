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
    extend: {
      fontFamily: {
        sans: ["NanumSquareNeo-Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
