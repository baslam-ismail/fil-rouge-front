/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-color-light)',
          hover: 'var(--primary-hover)',
        },
        accent: {
          DEFAULT: 'var(--accent-color)',
          hover: 'var(--accent-hover)',
        },
        danger: {
          DEFAULT: 'var(--danger-color)',
        },
        background: {
          main: 'var(--background-main)',
          card: 'var(--background-card)',
          sidebar: 'var(--background-sidebar)',
          highlight: 'var(--background-highlight)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        }
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        lg: 'var(--shadow-lg)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
