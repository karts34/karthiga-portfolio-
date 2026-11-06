/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#080510',
        midnight: '#080510',
        'cosmic-deep': '#160B27',
        'cosmic-indigo': '#321052',
        nebula: '#6330A0',
        violet: '#A855F7',
        lavender: '#C4B5FD',
        'text-primary': '#FFFFFF',
        'text-secondary': '#C4B5FD',
        'text-muted': '#B2A6C8',
        surface: '#10091F',
        'surface-raised': '#171027',
        'border-subtle': 'rgba(165, 107, 255, 0.12)',
        'border-glow': 'rgba(165, 107, 255, 0.3)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'orbit-slow': 'orbit 25s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'nebula-drift-1': 'nebulaDrift1 50s ease-in-out infinite',
        'nebula-drift-2': 'nebulaDrift2 65s ease-in-out infinite',
        'nebula-drift-3': 'nebulaDrift3 55s ease-in-out infinite',
        'hero-pulse': 'heroPulse 18s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        nebulaDrift1: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(25px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.97)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        nebulaDrift2: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-30px, 25px) scale(0.96)' },
          '66%': { transform: 'translate(20px, -18px) scale(1.04)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        nebulaDrift3: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(18px, 28px) scale(1.06)' },
          '66%': { transform: 'translate(-22px, -12px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        heroPulse: {
          '0%': { opacity: '0.5', filter: 'blur(60px)' },
          '50%': { opacity: '0.8', filter: 'blur(80px)' },
          '100%': { opacity: '0.5', filter: 'blur(60px)' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at 50% 0%, #160B27 0%, #080510 50%, #030208 100%)',
      }
    },
  },
  plugins: [],
}
