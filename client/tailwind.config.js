/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary-fixed-dim": "#ffb95f",
        "surface-container": "#201f1f",
        "inverse-primary": "#494bd6",
        "on-primary-container": "#0d0096",
        "surface-container-low": "#1c1b1b",
        "on-tertiary-fixed-variant": "#653e00",
        "outline": "#908fa0",
        "secondary-container": "#00b954",
        "surface-tint": "#c0c1ff",
        "on-secondary-fixed": "#002109",
        "secondary": "#4ae176",
        "on-tertiary": "#472a00",
        "surface-variant": "#353534",
        "secondary-fixed": "#6bff8f",
        "on-error-container": "#ffdad6",
        "background": "#131313",
        "outline-variant": "#464554",
        "on-surface": "#e5e2e1",
        "surface-bright": "#3a3939",
        "primary-fixed": "#e1e0ff",
        "surface-container-lowest": "#0e0e0e",
        "error": "#ffb4ab",
        "on-secondary-container": "#004119",
        "on-primary-fixed-variant": "#2f2ebe",
        "on-secondary-fixed-variant": "#005321",
        "on-error": "#690005",
        "on-primary-fixed": "#07006c",
        "on-secondary": "#003915",
        "tertiary": "#ffb95f",
        "inverse-on-surface": "#313030",
        "surface-container-highest": "#353534",
        "on-surface-variant": "#c7c4d7",
        "surface-container-high": "#2a2a2a",
        "on-tertiary-fixed": "#2a1700",
        "tertiary-fixed": "#ffddb8",
        "primary-fixed-dim": "#c0c1ff",
        "tertiary-container": "#ca8100",
        "inverse-surface": "#e5e2e1",
        "primary-container": "#8083ff",
        "primary": "#c0c1ff",
        "on-tertiary-container": "#3e2400",
        "error-container": "#93000a",
        "surface-dim": "#131313",
        "surface": "#131313",
        "secondary-fixed-dim": "#4ae176",
        "on-primary": "#1000a9",
        "on-background": "#e5e2e1"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter": "16px",
        "icon-btn-size": "32px",
        "sidebar-width": "240px",
        "element-gap": "8px",
        "container-padding": "24px"
      },
      fontFamily: {
        "badge": ["Inter"],
        "label-caps": ["Inter"],
        "headline-lg": ["Inter"],
        "body-sm": ["Inter"],
        "body-md": ["Inter"],
        "headline-md": ["Inter"]
      },
      fontSize: {
        "badge": ["12px", { "lineHeight": "1", "fontWeight": "600" }],
        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "body-sm": ["13px", { "lineHeight": "18px", "fontWeight": "400" }],
        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "headline-md": ["18px", { "lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "600" }]
      }
    }
  },
  plugins: []
};


