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
        background: '#f8f9fa',
        primary: '#00004c',
        primary_container: '#00008b',
        secondary: '#626200',
        secondary_container: '#e7e700',
        surface: '#f8f9fa',
        surface_container_low: '#f3f4f5',
        surface_container_lowest: '#ffffff',
        on_surface: '#191c1d',
        on_surface_variant: '#454653',
        error: '#ba1a1a',
      },
      fontFamily: {
        display: ['var(--font-plus-jakarta-sans)'],
        body: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
export default config
