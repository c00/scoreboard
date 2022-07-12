<script lang="ts">
	import { onMount } from 'svelte';
	import { hasVal, secondsToTime, timeToSeconds } from '../Config/ClockConfig/ClockHelper';
	import TextInput from './TextInput.svelte';

	export let seconds: number;
	export let label: string;

	let error: string;
	let input: string;

	$: if (input) setSeconds();

	onMount(() => {
		if (hasVal(seconds)) input = secondsToTime(seconds);
	});

	function setSeconds() {
		try {
			seconds = timeToSeconds(input);
			error = undefined;
		} catch (err) {
			error = String(err);
		}
	}
</script>

<TextInput bind:value={input} {label} placeholder="e.g. 10:00" />
<div class="mt-1 mb-2 hint-area">
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
