/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this points to your components
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}