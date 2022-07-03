<script>
import SegmentDisplay from '../SevenSegmentsDisplay/SegmentDisplay.svelte';

</script>
<div class="justify-center flex">
	<div>
		<span class="text-3xl">PLAYER</span>
    <SegmentDisplay size="sm" color="orange" length={2} value="76" />
		<SegmentDisplay size="sm" color="orange" length={2} value="" />
	</div>

  <div>
		<span class="text-3xl">PENALTY</span>
    <SegmentDisplay size="sm" color="red" length={5} value="2:36" />
		<SegmentDisplay size="sm" color="red" length={5} value="  :  " />
	</div>
</div>
