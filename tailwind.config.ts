import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09111f",
        paper: "#f8f4ec",
        coral: "#ff785a",
        mint: "#86efac",
        gold: "#f4b942"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(9, 17, 31, 0.14)"
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(9,17,31,0.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
