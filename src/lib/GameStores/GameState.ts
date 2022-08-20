export interface GameState {
	title: string;
	boardSize: number;
	boardTheme: string;
	mainClock: Clock;
	altClock: Clock;
	useClock: 'main' | 'alt';
	period: number;
	leftTeam: TeamState;
	rightTeam: TeamState;
}

export interface Clock {
	active: boolean;
	seconds: number;
	startedAt: number;
	stopAtZero: boolean;
}

export interface TeamState {
	side: 'left' | 'right';
	name: string;
	image: string;
	score: number;
	penalty1: PenaltyState;
	penalty2: PenaltyState;
	goalShots: number;
	activeGoal: boolean;
}

export interface PenaltyState {
	active: boolean;
	player: number;
	clock: Clock;
}

export const defaultState: GameState = {
	title: 'SCOREBOARD',
	boardSize: 16,
	boardTheme: 'dark',
	useClock: 'main',
	mainClock: {
		active: false,
		seconds: 60 * 30,
		startedAt: 1,
		stopAtZero: true
	},
	altClock: {
		active: false,
		seconds: 60 * 10,
		startedAt: 1,
		stopAtZero: true
	},
	period: 1,
	leftTeam: {
		side: 'left',
		name: 'THE LEFT TEAM',
		image: 'hmm',
		score: 0,
		goalShots: 0,
		activeGoal: false,
		penalty1: {
			active: false,
			clock: {
				active: false,
				seconds: 60 * 30,
				startedAt: 1,
				stopAtZero: true
			},
			player: null
		},
		penalty2: {
			active: false,
			clock: {
				active: false,
				seconds: 60 * 30,
				startedAt: 1,
				stopAtZero: true
			},
			player: null
		}
	},
	rightTeam: {
		side: 'right',
		name: 'THE RIGHT TEAM',
		image: 'hmm',
		score: 0,
		goalShots: 0,
		activeGoal: false,
		penalty1: {
			active: false,
			clock: {
				active: false,
				seconds: 60 * 30,
				startedAt: 1,
				stopAtZero: true
			},
			player: null
		},
		penalty2: {
			active: false,
			clock: {
				active: false,
				seconds: 60 * 30,
				startedAt: 1,
				stopAtZero: true
			},
			player: null
		}
	}
};
