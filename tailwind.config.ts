import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2540',
          50: '#E6EBF0',
          100: '#CCD7E1',
          200: '#99AFC3',
          300: '#6687A5',
          400: '#335F87',
          500: '#0A2540',
          600: '#081E33',
          700: '#061726',
          800: '#040F19',
          900: '#02080D',
        },
        accent: {
          DEFAULT: '#00B37E',
          50: '#E6F9F3',
          100: '#CCF3E7',
          200: '#99E7CF',
          300: '#66DBB7',
          400: '#33CF9F',
          500: '#00B37E',
          600: '#008F66',
          700: '#006B4D',
          800: '#004735',
          900: '#00241C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
