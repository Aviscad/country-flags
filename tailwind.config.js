/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				nunito: ['Nunito Sans', 'sans-serif']
			},
			colors: {
				'dark-elements': 'hsl(209, 23%, 25%)',
				'dark-background': 'hsl(207, 26%, 17%)',
				'light-font': 'hsl(200, 15%, 8%)',
				'light-input': 'hsl(0, 0%, 52%)',
				'light-background': 'hsl(0, 0%, 98%)'
			},
			keyframes: {
				fade: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				},
				slide: {
					'0%': { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
					'100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' }
				},
				bounce: {
					'0%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0)' }
				}
			},
			animation: {
				fade: 'fade .5s ease-in-out',
				slideLeft: 'slide .5s ease-in-out',
				bouncing: 'bounce 2s ease-in-out infinite'
			}
		}
	},
	plugins: []
}

/*
- Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
- Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
- Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
- Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
- Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
- White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)
*/
