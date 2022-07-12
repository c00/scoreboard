import { Duration } from 'luxon';

export function timeToSeconds(input: string): number {
	if (/^\d+$/.test(input)) {
		return Number(input);
	} else if (/^\d{1,2}:\d{1,2}$/.test(input)) {
		//Minutes and seconds
		const [mins, secs] = input.split(':');
		return Number(mins) * 60 + Number(secs);
	} else if (/^\d{1,2}:\d{1,2}:\d{1,2}$/.test(input)) {
		//hours and minutes and seconds.
		const [hours, mins, secs] = input.split(':');
		return Number(hours) * 60 * 60 + Number(mins) * 60 + Number(secs);
	}
	throw 'invalid input';
}

export function hasVal(input: unknown) {
	return input !== null && input !== undefined;
}

export function secondsToTime(seconds: number): string {
	return Duration.fromMillis(seconds * 1000).toFormat('mm:ss');
}
