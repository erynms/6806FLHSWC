/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // HS Writing Center Aesthetic - Warm Earth Tones
        parchment: {
          DEFAULT: '#F5F1E8',
          light: '#FDFBF7',
          dark: '#EBE5D6',
        },
        terracotta: {
          DEFAULT: '#C67B5C',
          light: '#D4937A',
          dark: '#A85D42',
        },
        sage: {
          DEFAULT: '#8B9E7D',
          light: '#A4B396',
          dark: '#6B7D5E',
        },
        olive: {
          DEFAULT: '#7A8450',
          light: '#949F6B',
        },
        sepia: {
          DEFAULT: '#3E3832',
          medium: '#5C5650',
          light: '#8B8680',
        },
        // Legacy primary mapping for compatibility
        primary: {
          50: '#FDFBF7',
          100: '#F5F1E8',
          200: '#EBE5D6',
          300: '#D4937A',
          400: '#C67B5C',
          500: '#C67B5C',
          600: '#A85D42',
          700: '#A85D42',
          800: '#8B6F4E',
          900: '#3E3832',
        },
      },
      fontFamily: {
        heading: ['Quicksand', 'ui-rounded', 'sans-serif'],
        body: ['Nunito', 'ui-rounded', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(62, 56, 50, 0.08)',
        'soft': '0 4px 12px rgba(62, 56, 50, 0.12)',
        'medium': '0 6px 20px rgba(62, 56, 50, 0.15)',
        'lifted': '0 8px 24px rgba(62, 56, 50, 0.18)',
      },
    },
  },
  plugins: [],
}
