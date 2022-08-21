/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'winter',
			{
				'custom-theme': {
					primary: '#e8f495',
					secondary: '#eabf93',
					accent: '#7a85e8',
					neutral: '#2B2F36',
					'base-100': '#464A4E',
					info: '#75A0F5',
					success: '#6CE4D8',
					warning: '#ED921D',
					error: '#F84F35',
				},
			},
		],
	},
};
