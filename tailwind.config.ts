import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            color: "var(--color-text)",
            a: { color: "#01696f" },
            "h1,h2,h3,h4": { color: "var(--color-text)", fontFamily: "var(--font-display)" },
            blockquote: { borderLeftColor: "#01696f", backgroundColor: "#f0fafa", padding: "1rem 1.5rem", borderRadius: "0.5rem" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
