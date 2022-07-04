<script lang="ts">
	import SegmentClock from '$lib/SegmentClock/SegmentClock.svelte';
	import type { Clock } from '$lib/GameStores/GameState';
	import { DateTime } from 'luxon';

	const clock: Clock = {
		running: false,
		seconds: 65,
		startedAt: DateTime.now().toSeconds(),
		stopAtZero: false
	};
</script>

Nothing here!

<div class="h-10">
	<SegmentClock color="green" format="  :  " {clock} />
</div>
