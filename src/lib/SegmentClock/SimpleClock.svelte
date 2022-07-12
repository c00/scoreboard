<script lang="ts">
	import { DateTime, Duration } from 'luxon';
	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
	import { time } from './timer';
	import { createEventDispatcher } from 'svelte';
	import { hasVal } from '../Config/ClockConfig/ClockHelper';

	export let seconds = 600;
	export let active = true;
	export let stopAtZero = true;

	export let color: string = 'green';
	export let format: string = '  :  ';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const dispatch = createEventDispatcher();

	let ms: number = 0;
	let value: string;
	let endTime: DateTime;

	$: hasVal(seconds) ? initClock() : clearClock();
	$: active ? resume() : pause();
	$: if (active && $time) tick();

	function clearClock() {
		active = false;
		value = null;
	}

	function initClock() {
		ms = seconds * 1000;
		setValue();
		endTime = DateTime.now().plus({ seconds });

		//Unset seconds so we can take in the same value again.
		// seconds = null;
	}

	function tick() {
		ms = endTime.diffNow().toMillis();
		if (ms <= 0 && stopAtZero) {
			ms = 0;
			active = false;
			dispatch('timerFinished');
		}
		setValue();
	}

	function pause() {
		endTime = null;
	}

	function resume() {
		endTime = DateTime.now().plus({ milliseconds: ms });
		setValue();
	}

	function setValue() {
		const absMs = Math.abs(ms);
		if (ms > 60 * 1000) {
			//Minutes and seconds
			value = Duration.fromMillis(absMs).toFormat('mm:ss');
		} else {
			//Show seconds and hundreths
			const hundreths = absMs / 10;
			const msPart = String(Math.floor(hundreths % 100)).padStart(2, '0');
			value = `${Duration.fromMillis(absMs).toFormat('ss')}:${msPart}`;
		}
	}
</script>

<!-- <pre>{value}</pre>
<pre>{endTime?.toISO()}</pre>
<pre>{ms}</pre> -->
<SegmentDisplay {color} {format} {value} {size} animate={ms > 60 * 1000} />
