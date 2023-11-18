/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",   
    ],
    theme: {
      extend: {
        colors: {
            "bgcolor": "#111827",
            "txtcolor": "#e2e8f0",
        }
      },
    },
    plugins: [],
  }