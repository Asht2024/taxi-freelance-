module.exports = {
    theme: {
      extend: {
        animation: {
          blink: 'blink 3s steps(2, start) infinite',
        },
        keyframes: {
          blink: {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0 },
          },
        },
      },
    },
  };