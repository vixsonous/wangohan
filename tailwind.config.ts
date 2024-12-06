import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation:{
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'spin': 'spin 1s linear infinite',
        'bubble': 'bubble 1s ease-out' 
      },
      keyframes: {
        'shake' : {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%' : {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        },

        'spin' : {
          from: { transform: 'scale(1) rotate(0deg)' },
          to: { transform: 'scale(1) rotate(360deg)' },
        },

        'bubble': {
          '0%': {
            transform: 'scale(1)' },
        
          '20%': {
            transform: 'scaleY(0.95) scaleX(1.05)' },
        
          '48% ': {
            transform: 'scaleY(1.1) scaleX(0.9)' },
        
          '68%': {
            transform: 'scaleY(0.98) scaleX(1.02)' },
        
          '80%': {
            transform: 'scaleY(1.02) scaleX(0.98)' },
        
          '97%, 100%': {
            transform: 'scale(1)' } }
      },
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
  
      // width: {
      //   '165px':'165px',
      //   '175px': '175px'
      // }
    },
  },
  plugins: [],
};
export default config;
