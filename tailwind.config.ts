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
        // Outmore Brand Colors
        jet: '#373534',
        linen: '#f7f1e9',
        'hot-embers': '#F25431',
        mist: '#efefed',

        // Extended palette
        'jet-light': '#5a5856',
        'jet-lighter': '#7a7573',
        sand: '#d4cec4',
        'sand-light': '#ebe5dc',
        cream: '#fcf9f5',

        // SKU Category Colors (updated for brand)
        'sku-finished': '#F25431',
        'sku-frame': '#373534',
        'sku-cushion': '#5a5856',
        'sku-core': '#d4cec4',
        'sku-shell': '#ebe5dc',
        'sku-heat': '#4a4847',
        'sku-cover': '#7a7573',
        'sku-accessory': '#5a5856',
        'sku-material': '#fcf9f5',
        'sku-marketing': '#95A5A6',

        // Semantic colors
        background: '#fcf9f5',
        foreground: '#373534',
        muted: '#5a5856',
        border: '#d4cec4',
        accent: '#F25431',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.5' }],
        'lg': ['18px', { lineHeight: '1.5' }],
        'xl': ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['30px', { lineHeight: '1.2' }],
        '4xl': ['36px', { lineHeight: '1.1' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(55, 53, 52, 0.05)',
        'DEFAULT': '0 1px 3px rgba(55, 53, 52, 0.1)',
        'md': '0 4px 6px rgba(55, 53, 52, 0.1)',
        'lg': '0 10px 15px rgba(55, 53, 52, 0.1)',
        'heated': '0 0 20px rgba(242, 84, 49, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-in': 'slideIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
