export interface Theme {
	background: string;
	text: string;
	accent: string;
	success: string;
	warn: string;
}

export const scoreboardThemes: Record<string, Theme> = {
	red: {
		background: '#991b1b',
		text: '#ffffff',
		accent: '#EA580C',
		success: '#10b981',
		warn: '#DC2626',
	},
  orange: {
		background: '#C2410C',
		text: '#ffffff',
		accent: '#EA580C',
		success: '#10b981',
		warn: '#DC2626',
	},
  grey: {
		background: '#3F3F46',
		text: '#ffffff',
		accent: '#EA580C',
		success: '#10b981',
		warn: '#DC2626',
	},
  black: {
		background: '#000000',
		text: '#ffffff',
		accent: '#EA580C',
		success: '#22C55E',
		warn: '#DC2626',
	},
};
