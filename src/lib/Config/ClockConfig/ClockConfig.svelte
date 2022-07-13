<script lang="ts">
	import ClockTimeInput from '../../Forms/ClockTimeInput.svelte';
	import Toggle from '../../Forms/Toggle.svelte';
	import type { Clock } from '../../GameStores/GameState';
	import SwitchIcon from './SwitchIcon.svelte';

	export let clock: Clock;
	export let showStopAtZeroToggle = true;
	export let showAltClock = true;

	let altClockSeconds: number = 600;

	$: activeLabel = clock.active ? 'Clock is running' : 'Clock stopped';

	function switchClocks() {
		const alt = altClockSeconds;
		altClockSeconds = clock.seconds;
		clock.seconds = alt;
	}
</script>

<Toggle bind:checked={clock.active} label={activeLabel} />
<ClockTimeInput bind:seconds={clock.seconds} label="Main Clock" />

{#if showAltClock}
	<div class="text-center">
		<button on:click={switchClocks} type="button" class="btn btn-sm btn-primary">switch <SwitchIcon /></button>
	</div>
	<ClockTimeInput bind:seconds={altClockSeconds} label="Alternative Clock" />
{/if}

{#if showStopAtZeroToggle}
	<Toggle bind:checked={clock.stopAtZero} color="secondary" label="Stop the clock at 0" />
{/if}
