/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Map semantic colors to CSS variables
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-active': 'var(--color-surface-active)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',

        // Text colors
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
        muted: 'var(--color-text-muted)',

        // Interactive colors
        link: 'var(--color-link)',
        'link-hover': 'var(--color-link-hover)',

        // Code colors
        'code-bg': 'var(--color-code-bg)',
        'code-text': 'var(--color-code-text)',

        // Status colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',

        // Brand colors (always the same)
        brand: {
          primary: 'rgb(var(--brand-primary) / <alpha-value>)',
          secondary: 'rgb(var(--brand-secondary) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent) / <alpha-value>)',
        },

        // Terminal/Cyberpunk colors
        terminal: {
          green: 'rgb(var(--terminal-green-rgb) / <alpha-value>)',
          amber: 'rgb(var(--terminal-amber-rgb) / <alpha-value>)',
          cyan: 'rgb(var(--terminal-cyan-rgb) / <alpha-value>)',
          magenta: 'rgb(var(--terminal-magenta-rgb) / <alpha-value>)',
          red: 'rgb(var(--terminal-red-rgb) / <alpha-value>)',
          blue: 'rgb(var(--terminal-blue-rgb) / <alpha-value>)',
          purple: 'rgb(var(--terminal-purple-rgb) / <alpha-value>)',
          yellow: 'rgb(var(--terminal-yellow-rgb) / <alpha-value>)',
          bg: 'var(--terminal-bg)',
          'bg-alt': 'var(--terminal-bg-alt)',
        },

        // Overlay colors
        overlay: 'var(--color-overlay)',
        backdrop: 'var(--color-backdrop)',
      },
      backgroundColor: {
        DEFAULT: 'var(--color-background)',
      },
      textColor: {
        DEFAULT: 'var(--color-text-primary)',
      },
      borderColor: {
        DEFAULT: 'var(--color-border)',
      },
    },
  },
  plugins: [],
};
