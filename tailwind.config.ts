import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#8B5E3C",
                secondary: "#F9F5EA",
                accent: "#D4A373",
                dark: "#333333",
                light: "#FFFBF2",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-poppins)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
            },
            boxShadow: {
                glow: "0 0 20px rgba(139, 94, 60, 0.15)",
                "card-hover": "0 20px 60px -15px rgba(139, 94, 60, 0.12)",
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.92)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "slide-in-left": {
                    "0%": { opacity: "0", transform: "translateX(-32px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "slide-in-right": {
                    "0%": { opacity: "0", transform: "translateX(32px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.7s ease-out forwards",
                "fade-in": "fade-in 0.5s ease-out forwards",
                "scale-in": "scale-in 0.5s ease-out forwards",
                "slide-in-left": "slide-in-left 0.7s ease-out forwards",
                "slide-in-right": "slide-in-right 0.7s ease-out forwards",
            },
        },
    },
    plugins: [],
};
export default config;
