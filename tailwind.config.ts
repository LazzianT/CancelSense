import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F8FBFF',
          100: '#EEF7FF',
          200: '#D7ECFF',
          300: '#9AD7FF',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        neo: {
          surface: '#F1F5F9',
          raised: '#F8FAFC',
          shadow: '#CBD5E1',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neo: '14px 14px 30px #cbd5e1, -14px -14px 30px #ffffff',
        'neo-soft': '8px 8px 18px #d1d9e6, -8px -8px 18px #ffffff',
        'neo-inset': 'inset 8px 8px 16px #cbd5e1, inset -8px -8px 16px #ffffff',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
