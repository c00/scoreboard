<script>
import SimpleClock from '../SegmentClock/SimpleClock.svelte';

	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
</script>

<div class="justify-center flex">
	<div>
		<div class="text-3xl">PLAYER</div>
		<div>
			<SegmentDisplay size="sm" color="orange" format="  " value="76" />
		</div>
		<div>
			<SegmentDisplay size="sm" color="orange" format="  " value="" />
		</div>
	</div>

	<div>
		<div class="text-3xl">PENALTY</div>
		<div><SimpleClock size="sm" color="red" format="  :  " seconds={6} /></div>
		<div><SimpleClock size="sm" color="red" format="  :  " seconds={null} /></div>
	</div>
</div>
