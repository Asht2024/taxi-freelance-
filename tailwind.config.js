module.exports = {
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 1.5s ease-out',
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px) scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '30%': { transform: 'translateY(-25px) rotate(2deg)' },
          '70%': { transform: 'translateY(15px) rotate(-2deg)' },
        }
      }
    }
  },
  
}