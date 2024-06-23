/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
				fade: 'fadeIn .3s ease-in-out',
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},

      keyframes: {
        dropInBounce: {
          '0%': { transform: 'translateY(-100vh)' },
          '80%': { transform: 'translateY(0)' },
          '90%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },

      animation: {
        dropInBounce: 'dropInBounce 2s ease-out',
        slideInLeft: 'slideInLeft 1s ease-out forwards 1.5s',
      },

      keyframes: {
        float: {
          '0%': { transform: 'translateX(-60vw)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      animation: {
        float: 'float 15s linear infinite',
      },
    },
  },
  plugins: [],
};
