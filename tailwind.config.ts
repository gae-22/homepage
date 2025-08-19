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
      colors: {
        // Brand palette
        primary: {
          DEFAULT: '#7c3aed', // violet-600
        },
        secondary: {
          DEFAULT: '#06b6d4', // cyan-500
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
    },
  },
  plugins: [typography],
};

export default config;
