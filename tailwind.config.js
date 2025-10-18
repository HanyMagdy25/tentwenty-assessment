/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "custom-white-color": "#EEF4F9",
        "custom-black-color": "#221F20",
      },
    },
  },
  plugins: [],
};
