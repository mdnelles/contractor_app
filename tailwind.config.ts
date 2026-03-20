import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        stage1: "#2196F3",
        stage2: "#FF9800",
        stage3: "#9C27B0",
        stage4: "#4CAF50",
        stage5: "#F44336",
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a5a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
