/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pampas: "#e9e5df",
        linen: "#fdfaf5",
        appBlue: "#2a1b52",
        appRed: "#79031D",
        appBlack: "#000407",
        appYellow: "#EDB518",
      },
      fonts: {
        fairPlay: "fairplay",
        montserrat: "montserrat",
        roboto: "roboto",
      },
    },
  },
  plugins: [],
};
