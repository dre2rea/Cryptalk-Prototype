import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", "[data-theme='dark']"],
  theme: {
    extend: {
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      colors: {
        // Text colors
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          inverse: "var(--text-inverse)",
        },
        // Foreground colors (icons, indicators)
        fg: {
          primary: "var(--fg-primary)",
          secondary: "var(--fg-secondary)",
          tertiary: "var(--fg-tertiary)",
          disabled: "var(--fg-disabled)",
          "brand-primary": "var(--fg-brand-primary)",
          "brand-secondary": "var(--fg-brand-secondary)",
          "error-primary": "var(--fg-error-primary)",
          "success-primary": "var(--fg-success-primary)",
          "warning-primary": "var(--fg-warning-primary)",
        },
        // Background colors
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
          quaternary: "var(--bg-quaternary)",
          active: "var(--bg-active)",
          overlay: "var(--bg-overlay)",
          "filter-button": "var(--bg-filter-button)",
          disabled: "var(--bg-disabled)",
          "brand-primary": "var(--bg-brand-primary)",
          "brand-secondary": "var(--bg-brand-secondary)",
        },
        // Border colors
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          disabled: "var(--border-disabled)",
        },
      },
      spacing: {
        "spacing-xxs": "var(--spacing-xxs)",
        "spacing-xs": "var(--spacing-xs)",
        "spacing-sm": "var(--spacing-sm)",
        "spacing-md": "var(--spacing-md)",
        "spacing-lg": "var(--spacing-lg)",
        "spacing-xl": "var(--spacing-xl)",
        "spacing-2xl": "var(--spacing-2xl)",
        "spacing-3xl": "var(--spacing-3xl)",
      },
      borderRadius: {
        "radius-sm": "var(--radius-sm)",
        "radius-md": "var(--radius-md)",
        "radius-lg": "var(--radius-lg)",
        "radius-xl": "var(--radius-xl)",
      },
      fontSize: {
        "text-xs": "var(--font-size-text-xs)",
        "text-sm": "var(--font-size-text-sm)",
        "text-md": "var(--font-size-text-md)",
        "text-lg": "var(--font-size-text-lg)",
        "display-xs": "var(--font-size-display-xs)",
        "display-sm": "var(--font-size-display-sm)",
        "display-md": "var(--font-size-display-md)",
      },
      lineHeight: {
        "text-xs": "var(--line-height-text-xs)",
        "text-sm": "var(--line-height-text-sm)",
        "text-md": "var(--line-height-text-md)",
        "text-lg": "var(--line-height-text-lg)",
        "display-xs": "var(--line-height-display-xs)",
        "display-sm": "var(--line-height-display-sm)",
        "display-md": "var(--line-height-display-md)",
      },
    },
  },
  plugins: [],
};

export default config;
