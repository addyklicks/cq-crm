/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3932', // Racing Green - Headings, Sidebar
        secondary: '#006241', // Watercourse - Highlights, Primary Buttons
        accent: '#00754A', // Accent Green - Icons, Stats
        snow: '#F9F9F9', // Section alternate
        romance: '#F2F0EB', // Section alternate
        hummingbird: '#D4E9E2', // Dark theme body text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
