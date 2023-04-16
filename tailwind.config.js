/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/blocks/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xxs: '380px',
      xxsMax: { max: '379px' },
      xs: '540px',
      xsMax: { max: '540px' },
      sm: '640px',
      smMax: { max: '639px' },
      md: '768px',
      mdMax: { max: '767px' },
      bg: '962px',
      bgMax: { max: '961px' },
      lg: '1024px',
      lgMax: { max: '1023px' },
      lx: '1180px',
      lxMax: { max: '1179px' },
      xl: '1280px',
      xlMax: { max: '1279px' },
    },
    extend: {
      colors: {
        "action": "var(--color-action)",
        "border": "var(--color-border)",
        "font": "var(--color-font)",
        "page": "var(--color-page)",
        "page-bright": "var(--color-page-bright)",
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        sans: ['var(--font-sans)'],
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
