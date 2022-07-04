import { DateTime } from 'luxon';
import { readable } from 'svelte/store';

export const time = readable(DateTime.now(), function start(set) {
	const interval = setInterval(() => {
		set(DateTime.now());
	}, 10);

	return function stop() {
		clearInterval(interval);
	};
});

export interface Timer {
  seconds: number;
  minutes: number;
  hundreths: number;
}