export interface GameState {
	mainClock: Clock;
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
	name: string;
	image: string;
	score: number;
	penalty1?: PenaltyState;
	penalty2?: PenaltyState;
	goalShots: number;
	activeGoal: boolean;
}

export interface PenaltyState {
	player: number;
	clock: Clock;
}

export const defaultState: GameState = {
	mainClock: {
		active: false,
		seconds: 60 * 30,
		startedAt: 1,
		stopAtZero: true
	},
	period: 1,
	leftTeam: {
		name: 'DICK MUNCHERS',
		image: 'hmm',
		score: 0,
		goalShots: 0,
		activeGoal: false
	},
	rightTeam: {
		name: 'ASS CATCHERS',
		image: 'hmm',
		score: 0,
		goalShots: 0,
		activeGoal: false
	}
};
