<script lang="ts">
	import ClockTimeInput from '../../Forms/ClockTimeInput.svelte';
	import Toggle from '../../Forms/Toggle.svelte';
	import type { Clock } from '../../GameStores/GameState';

	export let clock: Clock;
	export let showStopAtZeroToggle = true;

	$: activeLabel = clock.active ? 'Clock is running' : 'Clock stopped';
</script>

<Toggle bind:checked={clock.active} label={activeLabel} />
<ClockTimeInput bind:seconds={clock.seconds} label="Main Clock" />

{#if showStopAtZeroToggle}
	<Toggle bind:checked={clock.stopAtZero} color="secondary" label="Stop the clock at 0" />
{/if}
