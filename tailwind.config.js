/** @format */

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      borderWidth: {
        0.2: '0.2px', // Existing custom border width
        0.96: '0.96px', // New custom border width
      },
      colors: {
        'custom-blue': '#5D6B98',
        'custom-border': '#DDDDD9',
        'custom-gray': '#3C3C3C!important', // Add custom border color
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(0.3deg, #D9D9D9 21.4%, rgba(217, 217, 217, 0) 79.31%)!important',
      },
      borderRadius: {
        'custom-tl': '18.43px',
        'custom-tr': '18.43px',
        'custom-br': '2.3px',
        'custom-bl': '18.43px',
      },
    },
  },
  plugins: [],
};
