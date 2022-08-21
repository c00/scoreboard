<script lang="ts">
	import ClockTimeInput from '../../Forms/ClockTimeInput.svelte';
	import NumberInput from '../../Forms/NumberInput.svelte';
	import type { PenaltyState } from '../../GameStores/GameState';

	export let state: PenaltyState;
</script>

<div class="flex gap-4">
	<div class="mt-12">
		<input type="checkbox" bind:checked={state.clock.active} class="checkbox" />
	</div>
	<div class="w-28">
		<NumberInput placeholder="e.g. 12" bind:value={state.player} label="Player" />
	</div>
	<div class="">
		<ClockTimeInput bind:seconds={state.clock.seconds} label="Time" />
	</div>
</div>
