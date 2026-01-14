/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        ss: "1px",
        xs: "380px",
      },
    },
  },
  plugins: [require("daisyui" ),
    require("tailwind-scrollbar-hide")
  ],
};
