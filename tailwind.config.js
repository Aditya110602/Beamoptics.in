/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      colors: {
        beam: {
          50: "#effbff",
          100: "#d8f4fe",
          200: "#b4e9fc",
          300: "#7ed9f8",
          400: "#3cc1ef",
          500: "#16a3db",
          600: "#1184b8",
          700: "#136b93",
          800: "#165978",
          900: "#174964",
        },
      },
      boxShadow: {
        "beam-soft": "0 14px 32px rgba(2, 132, 199, 0.16)",
        "beam-glow": "0 0 0 1px rgba(125,211,252,.38), 0 18px 36px rgba(2,6,23,.32)",
      },
      keyframes: {
        beamPulse: {
          "0%,100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
      },
      animation: {
        "beam-pulse": "beamPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
