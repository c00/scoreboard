<script lang="ts">
	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
	export let logo: string;
	export let leftValue: number;
	export let rightValue: number;
</script>

<div class="flex justify-center">
	<div>
		<SegmentDisplay size="sm" format="  " color="orange" value={leftValue} />
	</div>
	<div>
		<img class="w-24 p-4" src={logo} alt="Scoreboard Logo" />
	</div>
	<div>
		<SegmentDisplay size="sm" format="  " color="orange" value={rightValue} />
	</div>
</div>
<div class="text-3xl">SHOTS ON GOAL</div>
