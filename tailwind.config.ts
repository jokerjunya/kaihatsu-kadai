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
        background: '#fffffe',
        foreground: '#2d334a',
        primary: '#272343',
        accent: '#ffd803',
        'button-text': '#272343',
        muted: '#bae8e8',
        card: '#ffffff',
        'border-custom': '#e3f6f5',
      },
    },
  },
  plugins: [],
}

export default config
