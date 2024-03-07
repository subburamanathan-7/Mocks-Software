/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
    	"./src/**/*.{html,js,jsx,ts,tsx}",
  	],
  	theme: {
		screens:{
			sm:'360px',
			tablet:'960px',
			desktop:'1248px',

			sm:'640px',
			md:'768px',	      
			lg:'1024px',	
			xl:'1280px',	
			'2xl':'1536px'
		},

		colors:{
			white:'#FFF',
			blue:'#1877F2',
			gray:'#808080',
			lgray:'#DBDFEA',
			orange:'#F08000',
			red:'#EE4B2B',
			green:'#009E60',
			black:'#36454F'
		},

		extend: {
			fontFamily:{
				poppins:['Poppins'],
				raleway: ['Raleway'],
				inconsolata: ['Inconsolata'],
			}
		},
  	},
  	plugins: [],
}

