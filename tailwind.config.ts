import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0C",
        surface: "#141418",
        surfaceHover: "#1A1A22",
        neonLime: "#D4FF00",
        limeHover: "#bce400",
        borderSubtle: "rgba(255, 255, 255, 0.1)",
      },
      boxShadow: {
        neon: "0 0 25px -5px rgba(212, 255, 0, 0.35)",
        "neon-sm": "0 0 12px -2px rgba(212, 255, 0, 0.4)",
        card: "0 8px 30px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "soundwave": "soundwave 1.2s ease-in-out infinite alternate",
      },
      keyframes: {
        soundwave: {
          "0%": { height: "20%" },
          "50%": { height: "100%" },
          "100%": { height: "40%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
