<script lang="ts">
	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
	export let logo: string;
</script>

<div class="flex justify-center">
	<div>
		<SegmentDisplay size="sm" format="  " color="orange" value="34" />
	</div>
	<div>
		<img class="w-24 p-4" src={logo} alt="Scoreboard Logo" />
	</div>
	<div>
		<SegmentDisplay size="sm" format="  " color="orange" value="34" />
	</div>
</div>
<div class="text-3xl">SHOTS ON GOAL</div>
