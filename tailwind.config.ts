import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        abril:[ 'Abril Fatface', 'serif'],
        sans: ['Courier Prime', 'sans-serif'],
        lobster: ['Lobster', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        // Replace 'Courier Prime' with your desired font family
      },
      screens: {
        'lg': '1024px', // Large screen size
        'md': '768px', // Normal screen size
        'sm': '640px', // Android screen size
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        green: "#0D533B",
        cream: "#FFF4DE",
        watGreen: "#25D366",
      },
      keyframes: {
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '0',
          },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 10s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;