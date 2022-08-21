<script lang="ts">
	import { currentEvent, HotkeyAction } from '$lib/hotkeys/hotkeyStore';
	import ClockTimeInput from '../../Forms/ClockTimeInput.svelte';
	import Toggle from '../../Forms/Toggle.svelte';
	import type { Clock } from '../../GameStores/GameState';
	import SwitchIcon from './SwitchIcon.svelte';

	export let clock: Clock;
	export let altClock: Clock = null;
	export let useClock: 'main' | 'alt';
	export let showStopAtZeroToggle = true;

	$: showAltClock = Boolean(altClock);
	$: if ($currentEvent === HotkeyAction.SWITCH_MAIN_CLOCK) {
		switchClocks();
		$currentEvent = HotkeyAction.COMMIT;
	}
	$: selectedClock = useClock === 'main' ? clock : altClock;
	$: activeLabel = selectedClock.active ? 'Clock is running' : 'Clock stopped';

	function switchClocks() {
		if (useClock === 'alt') {
			useClock = 'main';
			if (altClock.active) clock.active = true;
		} else {
			useClock = 'alt';
			if (clock.active) altClock.active = true;
		}
	}
</script>

<!-- todo this makes no sense anymore with the setting of the clocks. Apply the new logic properly. -->

<Toggle bind:checked={selectedClock.active} label={activeLabel} />
<ClockTimeInput
	active={useClock === 'main'}
	bind:seconds={clock.seconds}
	label="Main Clock{useClock === 'main' ? ' (Active)' : ''}"
/>

{#if showAltClock}
	<div class="text-center">
		<button on:click={switchClocks} type="button" class="btn btn-sm btn-primary"
			>switch to {useClock === 'main' ? 'alternative' : 'main'} clock <SwitchIcon /></button
		>
	</div>
	<ClockTimeInput
		active={useClock === 'alt'}
		bind:seconds={altClock.seconds}
		label="Alternative Clock{useClock === 'alt' ? ' (Active)' : ''}"
	/>
{/if}

{#if showStopAtZeroToggle}
	<Toggle bind:checked={clock.stopAtZero} color="secondary" label="Stop the clock at 0" />
{/if}
