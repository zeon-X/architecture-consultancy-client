/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "400px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        hs2p: "url('https://i.ibb.co/T2DNyxw/p.jpg')",
        hs2i: "url('https://i.ibb.co/qp879rY/i.jpg')",
        hs2e: "url('https://i.ibb.co/Px8DvhP/e.jpg')",
        hs2d: "url('https://i.ibb.co/D7T3jLZ/d.jpg')",
        hs2c: "url('https://i.ibb.co/BV9rvsQ/c.jpg')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0D0D0D",
          secondary: "#1A1919",
          accent: "#262626",
          neutral: "#0D0D0D",
          "base-100": "#FFFFFF",
          info: "#0072F5",
          success: "#079500",
          warning: "#F1AC06",
          error: "#DE1B8D",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
