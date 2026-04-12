/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#105339",
          hover: "#2D6A4F",
          light: "#B0F1CC",
        },
        cream: {
          DEFAULT: "#FEFAE8",
          input: "#F2EEDD", //inputs,
          comment: "#ECE8D8", //коментар у формі, кнопка поділитись сертифікатом в соц.м.
          footer: "#F8F4E3", //footer
        },
        brown: "#683C2A",
      },
      fonts: {
        heading: ["Manrope", "sans-serif"],
        text: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
