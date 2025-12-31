/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        zlfr: {
          gold: '#c8a04a',
          gold2: '#b8913d',
          ink: '#0b0b0d',
          smoke: '#121215',
          line: 'rgba(255,255,255,0.08)',
        },
      },
      letterSpacing: { wide2: '0.24em' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
