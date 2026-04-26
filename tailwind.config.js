import { act } from "react"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#105339", //текст в світлій темі
          hover: "#2D6A4F", //текст в темній темі
          light: "#B0F1CC",
        },
        cream: {
          DEFAULT: "#FEFAE8",
          input: "#F2EEDD", //inputs,
          active: "#E6E3D2", //активний стан кнопки
          comment: "#ECE8D8", //коментар у формі, кнопка поділитись сертифікатом в соц.м.
          footer: "#F8F4E3", //footer, колір тексту у темній темі
        },
        dark: {
          DEFAULT: "#19190D",
          input: "#302f25", //inputs,
          comment: "#292821", //коментар у формі, кнопка поділитись сертифікатом в соц.м.
          footer: "#1D1C12", //footer, колір тексту у світлій темі
        },
        text: {
          info: "#404943",
        },
        icon: {
          dark: "#0F5238",
          light: "#B0F1CC",
        },
        brown: "#683C2A",
        input: {
          text: "#707973",
        },
      },
      fonts: {
        heading: ["Manrope", "sans-serif"],
        text: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
