import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: ['class', "[data-theme='dark']"],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Unified Gothic (sans-serif) stack; display also uses sans
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          'Helvetica Neue',
          'Hiragino Kaku Gothic ProN',
          'Meiryo',
          'Helvetica',
          'Arial',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
        display: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          'Helvetica Neue',
          'Hiragino Kaku Gothic ProN',
          'Meiryo',
          'Helvetica',
          'Arial',
        ],
      },
      colors: {
        // Brand palette
        primary: {
          DEFAULT: '#7c3aed', // violet-600
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          DEFAULT: '#06b6d4', // cyan-500
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        accent: {
          DEFAULT: '#2f7de1', // existing accent (blue)
        },
        muted: {
          DEFAULT: '#94a3b8', // slate-400
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate.700'),
            '--tw-prose-headings': theme('colors.slate.900'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.slate.900'),
            '--tw-prose-quotes': theme('colors.slate.900'),
            'h1, h2, h3, h4': {
              letterSpacing: '-0.01em',
            },
            a: {
              color: theme('colors.accent.DEFAULT'),
              textDecoration: 'none',
              fontWeight: '600',
              transitionProperty: 'color, text-decoration-color',
              transitionDuration: '150ms',
              '&:hover': {
                color: theme('colors.primary.DEFAULT'),
                textDecoration: 'underline',
                textDecorationColor: theme('colors.primary.DEFAULT'),
                textUnderlineOffset: '3px',
              },
            },
            code: {
              backgroundColor: theme('colors.slate.100'),
              padding: '0.15rem 0.35rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'h1, h2, h3': {
              scrollMarginTop: '6rem',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.slate.100'),
            code: {
              backgroundColor: theme('colors.slate.800'),
            },
            a: {
              color: theme('colors.accent.DEFAULT'),
              '&:hover': {
                color: theme('colors.secondary.DEFAULT'),
              },
            },
          },
        },
      }),
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)',
        'soft-lg':
          '0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        xl: '0.85rem',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translateY(-10%) translateX(-5%)' },
          '50%': { transform: 'translateY(10%) translateX(5%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        aurora: 'aurora 14s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [typography],
};

export default config;
