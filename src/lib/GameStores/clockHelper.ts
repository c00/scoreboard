import { DateTime } from 'luxon';
import type { Clock } from './GameState';

export function startClock(c: Clock) {
	const copy = { ...c };
	copy.startedAt = DateTime.now().toSeconds();
	copy.active = true;

	return copy;
}

export function stopClock(c: Clock) {
	const copy = { ...c };

	copy.active = false;
	const diff = DateTime.fromSeconds(copy.startedAt + copy.seconds).diffNow();
	copy.seconds = diff.milliseconds / 1000;

	return copy;
}

export function hasVal(input: unknown) {
	return input !== null && input !== undefined;
}
