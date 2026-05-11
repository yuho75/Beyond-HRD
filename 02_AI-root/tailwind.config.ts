import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fbf8ff',
        surface: '#fbf8ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f2fb',
        'surface-container': '#efecf5',
        'on-surface': '#1b1b21',
        'on-surface-variant': '#454652',
        'outline-variant': '#c6c5d4',
        primary: '#000666',
        'primary-container': '#1a237e',
        'on-primary-container': '#8690ee',
        'electric-blue': '#3B82F6',
        'emerald-green': '#10B981',
        'electric-yellow': '#FFEB3B',
      },
      fontFamily: {
        serif: ['var(--font-nanum-myeongjo)', 'serif'],
        sans: ['Pretendard', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}
export default config
