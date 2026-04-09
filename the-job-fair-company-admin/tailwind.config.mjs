/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/features/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        brand: {
          DEFAULT: "#06b6d4",
          dark: "#0891b2",
        },
      },
    },
  },
  plugins: [],
};

export default config;

