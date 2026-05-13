/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        void: "#030712",
        plasma: "#67e8f9",
        aurora: "#a7f3d0",
        ion: "#f9a8d4",
        gold: "#fde68a"
      },
      boxShadow: {
        glow: "0 0 40px rgba(103, 232, 249, 0.22)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        scan: "scan 3.4s linear infinite",
        pulseGlow: "pulseGlow 2.6s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" }
        },
        scan: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.56", filter: "blur(0px)" },
          "50%": { opacity: "1", filter: "blur(1px)" }
        }
      }
    }
  },
  plugins: []
};
