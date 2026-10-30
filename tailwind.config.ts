import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#08783F", dark: "#064B2D", soft: "#E8F5ED" },
        accent: "#F2A900",
        canvas: "#F4F7F5",
        ink: { DEFAULT: "#14281F", muted: "#5B6F64", faint: "#8A9A91" },
        line: "#DCE5DF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(6,75,45,.06), 0 4px 12px rgba(6,75,45,.05)",
      },
    },
  },
  plugins: [],
};

export default config;
