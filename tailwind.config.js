/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},

		extend: {
			animation: {
				"infinite-scroll": "infinite-scroll 15s linear infinite",
			},
			keyframes: {
				"infinite-scroll": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-100%)" },
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
