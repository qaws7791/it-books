import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    gridTemplateColumns: {
      card: "repeat(auto-fill, minmax(250px, 1fr))",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "840px",
      // => @media (min-width: 840px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1240px",
      // => @media (min-width: 1240px) { ... }
      "2xl": "1440px",
      // => @media (min-width: 1440px) { ... }
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
      colors: {
        background: "rgb(var(--color-background))",
        "on-background": "rgb(var(--color-on-background))",
        surface: "rgb(var(--color-surface))",
        "surface-dim": "rgb(var(--color-surface-dim))",
        "surface-bright": "rgb(var(--color-surface-bright))",
        "surface-container-lowest":
          "rgb(var(--color-surface-container-lowest))",
        "surface-container-low": "rgb(var(--color-surface-container-low))",
        "surface-container": "rgb(var(--color-surface-container))",
        "surface-container-high": "rgb(var(--color-surface-container-high))",
        "surface-container-highest":
          "rgb(var(--color-surface-container-highest))",
        "on-surface": "rgb(var(--color-on-surface))",
        "surface-variant": "rgb(var(--color-surface-variant))",
        "on-surface-variant": "rgb(var(--color-on-surface-variant))",
        "inverse-surface": "rgb(var(--color-inverse-surface))",
        "inverse-on-surface": "rgb(var(--color-inverse-on-surface))",
        outline: "rgb(var(--color-outline))",
        "outline-variant": "rgb(var(--color-outline-variant))",
        shadow: "rgb(var(--color-shadow))",
        scrim: "rgb(var(--color-scrim))",
        "surface-tint": "rgb(var(--color-surface-tint))",
        primary: "rgb(var(--color-primary))",
        "on-primary": "rgb(var(--color-on-primary))",
        "primary-container": "rgb(var(--color-primary-container))",
        "on-primary-container": "rgb(var(--color-on-primary-container))",
        "inverse-primary": "rgb(var(--color-inverse-primary))",
        secondary: "rgb(var(--color-secondary))",
        "on-secondary": "rgb(var(--color-on-secondary))",
        "secondary-container": "rgb(var(--color-secondary-container))",
        "on-secondary-container": "rgb(var(--color-on-secondary-container))",
        error: "rgb(var(--color-error))",
        "on-error": "rgb(var(--color-on-error))",
        "error-container": "rgb(var(--color-error-container))",
        "on-error-container": "rgb(var(--color-on-error-container))",
        white: "rgb(var(--color-white))",
        black: "rgb(var(--color-black))",
      },
      width: {
        sidebar: "16rem",
      },
      height: {
        header: "4rem",
        main: "calc(100vh - 4rem)",
      },
      fontFamily: {
        sans: ["NanumSquareNeo-Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
