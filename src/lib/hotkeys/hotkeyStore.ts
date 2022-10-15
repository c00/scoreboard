import { browser } from '$app/env';
import { writable } from 'svelte/store';

export interface HotkeyConfig {
	shortcut: string;
	action: HotkeyAction;
}

export enum HotkeyAction {
	TOGGLE_ALL_CLOCKS = 'toggle-all-clocks',
	TOGGLE_MAIN_CLOCK = 'toggle-main-clock',
	SWITCH_MAIN_CLOCK = 'switch-main-clock',
	TOGGLE_ALL_PENALTY_CLOCKS = 'toggle-all-penalty-clocks',
	TOGGLE_PENALTY_CLOCK_1_LEFT = 'toggle-penalty-clock-1-left',
	TOGGLE_PENALTY_CLOCK_1_RIGHT = 'toggle-penalty-clock-1-right',
	TOGGLE_PENALTY_CLOCK_2_LEFT = 'toggle-penalty-clock-2-left',
	TOGGLE_PENALTY_CLOCK_2_RIGHT = 'toggle-penalty-clock-2-right',
	GOAL_LEFT = 'goal-left',
	GOAL_RIGHT = 'goal-right',
	HORN = 'horn',
	BUZZER = 'buzzer',
	COMMIT = 'commit-changes',
}

export const actionNames = {
	'toggle-all-clocks': 'Toggle all clocks',
	'switch-main-clock': 'Switch main and alternative clock',
	'toggle-main-clock': 'Toggle main clock',
	'toggle-all-penalty-clocks': 'Toggle all penalty clocks',
	'toggle-penalty-clock-1-left': 'Toggle penalty clock 1 (left)',
	'toggle-penalty-clock-1-right': 'Toggle penalty clock 1 (right)',
	'toggle-penalty-clock-2-left': 'Toggle penalty clock 2 (left)',
	'toggle-penalty-clock-2-right': 'Toggle penalty clock 2 (right)',
	'goal-left': 'Goal horn (left)',
	'goal-right': 'Goal horn (right)',
	buzzer: 'Buzzer',
	horn: 'Goal Horn',
	'commit-changes': 'Commit Pending Changes',
};

export const defaultHotkeys: HotkeyConfig[] = [
	{ shortcut: 's', action: HotkeyAction.TOGGLE_ALL_CLOCKS },
	{ shortcut: 't', action: HotkeyAction.TOGGLE_MAIN_CLOCK },
	{ shortcut: 'ctrl+s', action: HotkeyAction.SWITCH_MAIN_CLOCK },
	{ shortcut: 'p', action: HotkeyAction.TOGGLE_ALL_PENALTY_CLOCKS },
	{ shortcut: '1', action: HotkeyAction.TOGGLE_PENALTY_CLOCK_1_LEFT },
	{ shortcut: '2', action: HotkeyAction.TOGGLE_PENALTY_CLOCK_2_LEFT },
	{ shortcut: '3', action: HotkeyAction.TOGGLE_PENALTY_CLOCK_1_RIGHT },
	{ shortcut: '4', action: HotkeyAction.TOGGLE_PENALTY_CLOCK_2_RIGHT },
	{ shortcut: '[', action: HotkeyAction.GOAL_LEFT },
	{ shortcut: ']', action: HotkeyAction.GOAL_RIGHT },
	{ shortcut: 'g', action: HotkeyAction.HORN },
	{ shortcut: 'h', action: HotkeyAction.BUZZER },
	{ shortcut: 'Enter', action: HotkeyAction.COMMIT },
];

//Load from storage
const STORAGE_KEY = 'hotkey-config';
let state = defaultHotkeys;
if (browser) {
	try {
		const result = JSON.parse(localStorage.getItem(STORAGE_KEY));
		if (result && Array.isArray(result)) state = result;
	} catch (err) {
		//cannot load state.
	}
}

export const hotkeyStore = writable<HotkeyConfig[]>(state);

if (browser) {
	hotkeyStore.subscribe((v) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
	});
}

export const currentEvent = writable<HotkeyAction>();
