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
        'primary-bg': '#FFE9C9',
        'secondary-bg': '#FFFAF0',
        'primary-text': '#523636'
      },
      maxWidth: {
        'md': '768px',
        'lg': '1024px',
        'sm': '640px',
        'xl': '1280px',
        '2xl': '1536px'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      }
  
      // width: {
      //   '165px':'165px',
      //   '175px': '175px'
      // }
    },
  },
  plugins: [],
};
export default config;
