<script>
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';
	import SegmentDisplay from '../lib/SevenSegmentsDisplay/SegmentDisplay.svelte';

	let value = 10000;
	let time = '00:00:00';

	onMount(() => {
		const interval = setInterval(() => {
			value--;
			time = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

Nothing here!
