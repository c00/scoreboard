import { writable } from 'svelte/store';
import { browser } from '$app/env';

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
		goalShots: 0
	},
	rightTeam: {
		name: 'ASS CATCHERS',
		image: 'hmm',
		score: 0,
		goalShots: 0
	}
};

//Load initial gamestate
export const STORAGE_KEY = 'gamestate';
function createGameStateStore() {
	if (!browser) {
		//Just return a default for server side rendering.
		return writable<GameState>(defaultState);
	}

	let state: GameState;
	try {
		state = JSON.parse(localStorage.getItem(STORAGE_KEY));
		if (!state) state = defaultState;
		console.log('Gotten from storage', state);
	} catch (err) {
		//JSOM parse error
		state = defaultState;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		console.log('Using default state', state);
	}
	const store = writable<GameState>(state);

	store.subscribe((v) => {
		console.log('updating localStorage', v);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
	});

	return store;
}
export const gameState = createGameStateStore();
