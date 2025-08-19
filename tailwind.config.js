/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      opacity: {
        15: '0.15',
        30: '0.30',
        50: '0.50',
        60: '0.60',
        70: '0.70',
        80: '0.80',
        90: '0.90',
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',  // Adjust this to match your design
          light: '#60A5FA',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#10B981',  // Adjust this to match your design
          light: '#34D399',
          dark: '#059669',
        },
        accent: {
          DEFAULT: '#6366F1',  // Indigo color
          light: '#818CF8',
          dark: '#4F46E5',
        },
        'card-bg': 'rgba(255, 255, 255, 0.1)',
        'card-border': 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
