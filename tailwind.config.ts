import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      header: '16px',
      subtitle: '14px',
      title: '12px',
      content: '10px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      base: '#5562F6',
      softbase: '#F9E3F0',
      gray: '#BBBBBB',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
