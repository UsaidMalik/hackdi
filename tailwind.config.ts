import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lora)'],
      },
      colors: {
        background: '#F5F5DC',
        text: '#36454F',
        primary: '#228B22',
        secondary: '#D4AF37',
      },
    },
  },
  plugins: [],
};
export default config;
