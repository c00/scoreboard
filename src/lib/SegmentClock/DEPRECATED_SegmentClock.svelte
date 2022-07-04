<script lang="ts">
	import { DateTime, Duration } from 'luxon';

	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
	import type { Timer } from './timer';

	export let color: string = null;
	export let format: string = '  :  ';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	//Starting Seconds
	export let seconds: number = 600;
	export let stopAtZero = true;
	export let active = false;

	let ms: number;

	//Time on the timer.
	$: if (seconds !== null && seconds !== undefined) initClock();
	// $: started = active ? DateTime.now() : null;
	$: endTime = active ? DateTime.now().plus({ seconds }) : null;

	const timer: Timer = {
		minutes: 0,
		seconds: 0,
		hundreths: 0
	};

	let value: string;

	function initClock() {
		ms = seconds * 1000;
		// setTime();
	}

	// $: if (active && $time) setTime();
	// $: if (clock) setTime();

	const setTime = (duration: Duration) => {
		// if (!endTime) {
		// 	console.log("Why isn't endTime set??");
		// 	return;
		// }
		// const diff = started().add(seconds)).diff($time);

		value = duration.toFormat('mm:ss');

		const hundreths = ms / 10;
		timer.hundreths = Math.floor(hundreths % 100);
		timer.seconds = Math.floor(ms / 1000) % 60;
		timer.minutes = Math.floor(ms / 1000 / 60);

		if (timer.minutes > 0) {
			value = `${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
		} else {
			value = `${String(timer.seconds).padStart(2, '0')}:${String(timer.hundreths).padStart(
				2,
				'0'
			)}`;
		}
	};
</script>

<div>
	<div>
		{String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}:{String(
			timer.hundreths
		).padStart(2, '0')}
	</div>
</div>
<hr />
<SegmentDisplay {color} {format} {size} {value} />
