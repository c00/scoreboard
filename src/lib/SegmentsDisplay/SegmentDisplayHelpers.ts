import { hasVal } from '../Config/ClockConfig/ClockHelper';
export function inputToSegmentValue(input: string | number, size: number, digits = 0): string[] {
	const array = Array(size).fill(null);
	if (!hasVal(input)) return array;

	if (typeof input === 'number') {
		input = input.toFixed(digits);
	}

	if (input.length > size) {
		input = input.substring(input.length - size);
	} else if (input.length < size) {
		input = input.padStart(size, ' ');
	}
	return input.split('');
}
