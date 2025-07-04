// tailwind.config.mjs
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Custom Color Palette
      colors: {
        primary: "#E30613", // Urgent Red
        secondary: "#000000", // Authority Black
        accent: "#FFD700", // Premium Gold
        background: "#FFFFFF", // Pure White

        // Softened alternatives
        "primary-light": "#FF3A4A",
        "secondary-light": "#333333",
        "accent-light": "#FFE55C",
      },

      // Custom Font Families
      fontFamily: {
        heading: ["Barlow", "sans-serif"], // Bold headings
        subheading: ["Poppins", "sans-serif"], // Clean subheadings
        body: ["Inter", "sans-serif"], // Readable text
      },

      // Extended Text Styles
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "display-lg": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "urgent-sm": ["0.875rem", { lineHeight: "1.4", fontWeight: "600" }],
      },

      // Custom Typography Variant
      typography: (theme) => ({
        urgent: {
          css: {
            "--tw-prose-headings": theme("colors.primary"),
            "--tw-prose-links": theme("colors.primary"),
            "--tw-prose-bold": theme("colors.secondary"),
          },
        },
      }),
    },
  },
  plugins: [typography],
  safelist: [
    {
      pattern: /(text|bg|border)-(primary|secondary|accent)(-light)?/,
    },
    "font-heading",
    "font-subheading",
    "font-body",
  ],
};

export default config;
