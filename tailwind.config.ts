import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Pretendard", "Inter", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          dark: "#1d4ed8",
          light: "#dbeafe"
        }
      }
    }
  },
  plugins: []
};

export default config;
