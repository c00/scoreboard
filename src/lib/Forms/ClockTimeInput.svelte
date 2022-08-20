<script lang="ts">
	import { hasVal, secondsToTime, timeToSeconds } from '../Config/ClockConfig/ClockHelper';
	import TextInput from './TextInput.svelte';

	export let seconds: number;
	export let label: string;
	export let active = false;

	let error: string;
	let input: string;

	$: if (input) setSeconds();
	$: if (seconds) setInput();

	function setInput() {
		if (!hasVal(seconds)) return;

		//If the parsed seconds haven't changed, don't update.
		try {
			if (timeToSeconds(input) === seconds) return;
		} catch (err) {
			//If any parsing error happens, it's a good time to update.
		}

		input = secondsToTime(seconds);
	}

	function setSeconds() {
		try {
			error = undefined;
			const newSeconds = timeToSeconds(input);
			if (newSeconds === seconds) return;
			seconds = newSeconds;
		} catch (err) {
			error = String(err);
		}
	}
</script>

<TextInput {active} bind:value={input} {label} placeholder="e.g. 10:00" />
<div class="mt-1 hint-area">
	{#if error}
		<div class="text-error">{error}</div>
	{:else}
		<div class="text-slate-500 text-sm">
			<slot name="hint" />
		</div>
	{/if}
</div>

<style>
	.hint-area {
		min-height: 24px;
	}
</style>
