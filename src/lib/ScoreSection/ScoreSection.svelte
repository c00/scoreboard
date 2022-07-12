<script lang="ts">
	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';

  export let image: string;
  export let name: string;
	export let score: number;
</script>

<div class="text-center">
	<div><img src={image} alt="Team logo" class="aspect-square w-28 mx-auto" /></div>
	<div class="mt-2 mb-1 text-4xl underline">{name}</div>
	<div class="mt-4">
		<SegmentDisplay format="  " value={score} />
	</div>
</div>
