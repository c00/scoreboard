<script lang="ts">
	import { DateTime } from 'luxon';

	import type { Clock } from '../GameStores/GameState';
	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
	import { time, type Timer } from './timer';

	export let color: string = null;
	export let format: string = '  :  ';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	export let clock: Clock;

	const timer: Timer = {
		minutes: 0,
		seconds: 0,
		hundreths: 0
	};

	let value: string;

	$: if ($time) calcTime();

	const calcTime = () => {
		if (!clock) {
			timer.minutes = 0;
			timer.seconds = 0;
			timer.hundreths = 0;
		}
		if (!clock.running) return;

		const diff = DateTime.fromSeconds(clock.startedAt + clock.seconds).diff($time);
		const hundreths = diff.milliseconds / 10;
		timer.hundreths = Math.floor(hundreths % 100);
		timer.seconds = Math.floor(diff.milliseconds / 1000) % 60;
		timer.minutes = Math.floor(diff.milliseconds / 1000 / 60);

		if (timer.minutes > 0) {
			value = `${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
		} else {
			value = `${String(timer.seconds).padStart(2, '0')}:${String(timer.hundreths).padStart(2, '0')}`;
		}
	};
</script>

<div>
	<div>{String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}:{String(timer.hundreths).padStart(2, '0')}</div>
</div>
<hr />
<SegmentDisplay {color} {format} {size} {value} />
