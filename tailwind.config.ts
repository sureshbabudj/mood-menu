/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,js,ts,tsx,mdx}",
    "./components/**/*.{html,js,ts,tsx,mdx}",
    "./views/**/*.{html,js,ts,tsx,mdx}",
    "./hooks/**/*.{html,js,ts,tsx,mdx}",
    "./lib/**/*.{html,js,ts,tsx,mdx}",
    "./orm/**/*.{html,js,ts,tsx,mdx}",
    "./src/**/*.{html,js,ts,tsx,mdx}",
  ],
  darkMode: ["media", "class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Karla", "ui-sans-serif", "system-ui"],
        serif: ["Karla", "ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Oswald"],
        body: ["Karla"],
        sourgummy: ["Sour Gummy"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounce-subtle 3s ease-in-out infinite",
        blob: "blob 7s infinite",
        "mood-celebrate":
          "mood-celebrate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "recipe-reveal":
          "recipe-reveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "heart-beat":
          "heart-beat 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "scale-pop": "scale-pop 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up-fade": "slide-up-fade 0.4s ease-out forwards",
        "success-glow": "success-glow 0.6s ease-out forwards",
        "ingredient-check":
          "ingredient-check 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "shimmer-pulse": "shimmer-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "mood-celebrate": {
          "0%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(1.15) rotate(5deg)" },
          "100%": { transform: "scale(1.1) rotate(0deg)", opacity: "1" },
        },
        "recipe-reveal": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "heart-beat": {
          "0%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.3)" },
          "50%": { transform: "scale(1.2)" },
          "75%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        "scale-pop": {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "70%": { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up-fade": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "success-glow": {
          "0%": { boxShadow: "0 0 0 0 rgba(244, 157, 37, 0.7)" },
          "50%": { boxShadow: "0 0 0 10px rgba(244, 157, 37, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(244, 157, 37, 0)" },
        },
        "ingredient-check": {
          "0%": { transform: "scale(0.6) rotate(-20deg)", opacity: "0" },
          "70%": { transform: "scale(1.1) rotate(5deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "shimmer-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
