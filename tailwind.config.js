/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				merienda: ['Merienda'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			//+1 => 0.25 rem
			minHeight: {
				96: '24rem',
				128: '32rem',
			},
			maxHeight: {
				96: '24rem',
				128: '32rem',
			},
			animation: {
				skeleton: 'skeleton 1s linear infinite alternate',
			},
			keyframes: {
				skeleton: {
					'0%': { backgroundColor: 'hsl(200, 20%, 80%)' },
					'100%': { backgroundColor: 'hsl(200, 20%, 95%)' },
				},
			},
			transformOrigin: {
				0: '0%',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		logs: true,
		styled: true,
		themes: true,
		base: true,
		utils: true,
		rtl: false,
		prefix: '',
		darkTheme: 'light',
		themes: [
			{
				light: {
					primary: '#353535',
					secondary: '#48A855',
					accent: '#fcc92f',
					info: '#5dcfff',
					success: '#88eb56',
					warning: '#F7931E',
					error: '#f16767',
					neutral: '#eaeaea',
					'neutral-focus': '#d9d9d9',
					'base-100': '#ffffff', //1
					'base-200': '#f5f7f9', //2
					'base-300': '#e5e7e9', //3
					'base-content': '#555', //text
					'--rounded-box': '1rem',
					'--rounded-btn': '0.35rem',
					'--rounded-badge': '0.8rem',
					'--animation-btn': '0.25s',
					'--animation-input': '.4s',
					'--padding-card': '2rem',
					'--btn-text-case': 'uppercase',
					'--btn-focus-scale': '0.95',
					'--border-btn': '1px',
					'--tab-border': '1px',
					'--tab-radius': '0.5rem',
				},
				dark: {
					primary: '#6c6c6c',
					secondary: '#48A855',
					accent: '#fcc92f',
					info: '#5dcfff',
					success: '#88eb56',
					warning: '#F7931E',
					error: '#f16767',
					neutral: '#30363e', // mau base cua btn lech sang hon 0.1
					'neutral-focus': '#444c56',
					'base-100': '#22272e',
					'base-200': '#1c2128',
					'base-300': '#101317',
					'base-content': '#fafafa', //text
					'--rounded-box': '1rem',
					'--rounded-btn': '0.35rem',
					'--rounded-badge': '0.8rem',
					'--animation-btn': '0.25s',
					'--animation-input': '.4s',
					'--padding-card': '2rem',
					'--btn-text-case': 'uppercase',
					'--btn-focus-scale': '0.95',
					'--border-btn': '1px',
					'--tab-border': '1px',
					'--tab-radius': '0.5rem',
				},
			},
		],
	},
};
