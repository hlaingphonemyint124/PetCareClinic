/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        bg: { DEFAULT: '#080b12', 2: '#0d1117', 3: '#131820', 4: '#1a2030' },
        surface: { DEFAULT: '#1a2035', 2: '#202840', 3: '#283050' },
        green: { DEFAULT: '#00e5a0', dark: '#00b87d', glow: 'rgba(0,229,160,0.15)' },
        amber: { DEFAULT: '#ffb84d', glow: 'rgba(255,184,77,0.15)' },
        blue: { DEFAULT: '#4da6ff', glow: 'rgba(77,166,255,0.15)' },
        red: { DEFAULT: '#ff4d6d', glow: 'rgba(255,77,109,0.15)' },
        purple: { DEFAULT: '#b48aff', glow: 'rgba(180,138,255,0.15)' },
        teal: { DEFAULT: '#2dd4bf' },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
        'fade-in': 'fadeIn 0.4s ease both',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-16px)' } },
        pulseGlow: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.5 } },
        gradientShift: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        slideUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.9)' }, to: { opacity: 1, transform: 'scale(1)' } },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,229,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.03) 1px, transparent 1px)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      backgroundSize: { 'grid': '40px 40px' },
      boxShadow: {
        'green-glow': '0 0 30px rgba(0,229,160,0.3), 0 0 60px rgba(0,229,160,0.1)',
        'card-3d': '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        'inner-glow': 'inset 0 0 40px rgba(0,229,160,0.05)',
      },
    },
  },
  plugins: [],
}
