/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        volkhov: ["Volkhov", "serif"], // Add Volkhov font
        yesteryear: ["Yesteryear", "cursive"], // Add Yesteryear font
      },
    },
  },
  plugins: [],
};
