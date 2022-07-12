import { browser } from "$app/env";
import { writable } from "svelte/store";
import { defaultState, type GameState } from "./GameState";

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

export const pendingState = writable<GameState>();
