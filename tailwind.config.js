/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:
      {
        myColor:"rgba(53, 94, 97, 0.499)",
      }
    },
  },
  plugins: [],
}

