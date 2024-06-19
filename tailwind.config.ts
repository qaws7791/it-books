import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const isProduction = process.env.NODE_ENV === "production";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ...(isProduction ? [] : ["./stories/**/*.{js,ts,jsx,tsx,mdx}"]),
  ],
  theme: {
    fontWeight: {
      light: "300",
      medium: "500",
      bold: "700",
      extrabold: "800",
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
      gridTemplateColumns: {
        card: "repeat(auto-fill, minmax(256px, 1fr))",
        "card-lg": "repeat(auto-fill, minmax(400px, 1fr))",
      },
      width: {
        sidebar: "18rem",
        4.5: "1.125rem",
        header: "calc(100% - 6rem)",
      },
      height: {
        header: "4rem",
        main: "calc(100vh - 4rem)",
        4.5: "1.125rem",
      },
      fontFamily: {
        sans: ["NanumSquareNeo", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        elevation: `-1px 1px 1.7px rgb(0 0 0 / 0.09),
      -3.9px 3.9px 6.7px -0.6px rgb(0 0 0 / 0.11),
      -9.1px 9.1px 15.7px -1.2px rgb(0 0 0 / 0.12),
      -21.2px 21.2px 36.7px -1.8px rgb(0 0 0 / 0.14)`,
        1: `rgba(0, 0, 0, 0.3) 0px 1px 2px 0px, rgba(0, 0, 0, 0.15) 0px 1px 3px 1px`,
        2: `rgba(0, 0, 0, 0.3) 0px 1px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 6px 2px`,
        3: `rgba(0, 0, 0, 0.3) 0px 1px 3px 0px, rgba(0, 0, 0, 0.15) 0px 4px 8px 3px`,
        4: `rgba(0, 0, 0, 0.3) 0px 2px 3px 0px, rgba(0, 0, 0, 0.15) 0px 6px 10px 4px`,
        5: `rgba(0, 0, 0, 0.3) 0px 4px 4px 0px, rgba(0, 0, 0, 0.15) 0px 8px 12px 6px`,
      },
      blur: {
        xxs: "1px",
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        16: "0.16",
      },
      colors: {
        primary: "rgb(var(--color-primary))",
        "surface-tint": "rgb(var(--color-surface-tint))",
        "on-primary": "rgb(var(--color-on-primary))",
        "primary-container": "rgb(var(--color-primary-container))",
        "on-primary-container": "rgb(var(--color-on-primary-container))",
        secondary: "rgb(var(--color-secondary))",
        "on-secondary": "rgb(var(--color-on-secondary))",
        "secondary-container": "rgb(var(--color-secondary-container))",
        "on-secondary-container": "rgb(var(--color-on-secondary-container))",
        tertiary: "rgb(var(--color-tertiary))",
        "on-tertiary": "rgb(var(--color-on-tertiary))",
        "tertiary-container": "rgb(var(--color-tertiary-container))",
        "on-tertiary-container": "rgb(var(--color-on-tertiary-container))",
        error: "rgb(var(--color-error))",
        "on-error": "rgb(var(--color-on-error))",
        "error-container": "rgb(var(--color-error-container))",
        "on-error-container": "rgb(var(--color-on-error-container))",
        background: "rgb(var(--color-background))",
        "on-background": "rgb(var(--color-on-background))",
        surface: "rgb(var(--color-surface))",
        "on-surface": "rgb(var(--color-on-surface))",
        "surface-variant": "rgb(var(--color-surface-variant))",
        "on-surface-variant": "rgb(var(--color-on-surface-variant))",
        outline: "rgb(var(--color-outline))",
        "outline-variant": "rgb(var(--color-outline-variant))",
        shadow: "rgb(var(--color-shadow))",
        scrim: "rgb(var(--color-scrim))",
        "inverse-surface": "rgb(var(--color-inverse-surface))",
        "inverse-on-surface": "rgb(var(--color-inverse-on-surface))",
        "inverse-primary": "rgb(var(--color-inverse-primary))",
        "primary-fixed": "rgb(var(--color-primary-fixed))",
        "on-primary-fixed": "rgb(var(--color-on-primary-fixed))",
        "primary-fixed-dim": "rgb(var(--color-primary-fixed-dim))",
        "on-primary-fixed-variant":
          "rgb(var(--color-on-primary-fixed-variant))",
        "secondary-fixed": "rgb(var(--color-secondary-fixed))",
        "on-secondary-fixed": "rgb(var(--color-on-secondary-fixed))",
        "secondary-fixed-dim": "rgb(var(--color-secondary-fixed-dim))",
        "on-secondary-fixed-variant":
          "rgb(var(--color-on-secondary-fixed-variant))",
        "tertiary-fixed": "rgb(var(--color-tertiary-fixed))",
        "on-tertiary-fixed": "rgb(var(--color-on-tertiary-fixed))",
        "tertiary-fixed-dim": "rgb(var(--color-tertiary-fixed-dim))",
        "on-tertiary-fixed-variant":
          "rgb(var(--color-on-tertiary-fixed-variant))",
        "surface-dim": "rgb(var(--color-surface-dim))",
        "surface-bright": "rgb(var(--color-surface-bright))",
        "surface-container-lowest":
          "rgb(var(--color-surface-container-lowest))",
        "surface-container-low": "rgb(var(--color-surface-container-low))",
        "surface-container": "rgb(var(--color-surface-container))",
        "surface-container-high": "rgb(var(--color-surface-container-high))",
        "surface-container-highest":
          "rgb(var(--color-surface-container-highest))",
      },
      keyframes: {
        enterFromRight: {
          from: { transform: "translateX(100px)" },
          to: { transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0%)" },
        },
        exitToRight: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100px)" },
        },
        exitToLeft: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-100%, 0, 0)" },
        },
        scaleIn: {
          from: { transform: "rotateX(-10deg) scale(0.9)" },
          to: { transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { transform: "rotateX(0deg) scale(1)" },
          to: { transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
    },
    animation: {
      scaleIn: "scaleIn 300ms ease",
      scaleOut: "scaleOut 300ms ease",
      fadeIn: "fadeIn 300ms ease",
      fadeOut: "fadeOut 300ms ease",
      enterFromLeft: "enterFromLeft 350ms ease",
      enterFromRight: "enterFromRight 350ms ease",
      exitToLeft: "exitToLeft 350ms ease",
      exitToRight: "exitToRight 350ms ease",
    },
  },
  plugins: [],
};

export default config;
