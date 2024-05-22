/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},

		extend: {
			animation: {
				"infinite-scroll-x": "infinite-scroll-x 15s linear infinite",
				"infinite-scroll-y": "infinite-scroll-y 15s linear infinite",
			},
			keyframes: {
				"infinite-scroll-x": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-100%)" },
				},
				"infinite-scroll-y": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(-100%)" },
				},
			},
			colors: {
				primary: "#131313",
				secondary: "#D0D5DD",
			},
		},
	},
	plugins: [],
};
