<script>
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
		<div><SegmentDisplay size="sm" color="red" format="  :  " value="2:36" /></div>
		<div><SegmentDisplay size="sm" color="red" format="  :  " value="" /></div>
	</div>
</div>
