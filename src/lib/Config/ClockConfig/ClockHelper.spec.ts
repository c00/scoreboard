import { timeToSeconds } from './ClockHelper';

describe('CLockhelper', () => {
	test('seconds', () => {
		const values = [
			{ in: '120', out: 120 },
			{ in: '2:0', out: 120 },
			{ in: '02:00', out: 120 },
			{ in: '02:02:02', out: 7322 },
		];

		for (const v of values) {
			expect(timeToSeconds(v.in)).toBe(v.out);
		}
	});
});
