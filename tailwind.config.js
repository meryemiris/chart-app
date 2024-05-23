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

				"infinite-scroll-y-reverse":
					"infinite-scroll-y-reverse 15s linear infinite",
				"infinite-scroll-y-direct":
					"infinite-scroll-y-direct 15s linear infinite",
			},
			keyframes: {
				"infinite-scroll-x": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-100%)" },
				},

				"infinite-scroll-y-direct": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(-100%)" },
				},

				"infinite-scroll-y-reverse": {
					from: { transform: "translateY(-100%)" },
					to: { transform: "translateY(0)" },
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
