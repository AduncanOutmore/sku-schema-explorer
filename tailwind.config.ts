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
        // SKU Category Colors
        'sku-finished': '#2F5496',
        'sku-frame': '#5B9BD5',
        'sku-cushion': '#70AD47',
        'sku-core': '#9DC3E6',
        'sku-shell': '#A9D18E',
        'sku-heat': '#FFC000',
        'sku-cover': '#8E44AD',
        'sku-accessory': '#E67E22',
        'sku-material': '#F4B183',
        'sku-marketing': '#95A5A6',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
