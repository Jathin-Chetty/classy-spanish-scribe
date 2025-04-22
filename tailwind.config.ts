
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#9b87f5',
					foreground: '#fff'
				},
				secondary: {
					DEFAULT: '#D3E4FD',
					foreground: '#1A1F2C'
				},
				card: {
					DEFAULT: '#fff',
					foreground: '#403E43'
				},
				muted: {
					DEFAULT: "#F1F0FB",
					foreground: "#8E9196"
				},
			},
			boxShadow: {
				smooth: "0 4px 32px 0 rgba(155,135,245,0.1), 0 1.5px 5px 0 rgba(65,62,100,0.05)"
			},
			borderRadius: {
				xl: "1.25rem",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
