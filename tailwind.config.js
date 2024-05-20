/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},

		extend: {
			colors: {
				primary: "#131313",
				secondary: "#D0D5DD",
			},
		},
	},
	plugins: [],
};
