<script lang="ts">
	import SimpleClock from '$lib/SegmentClock/SimpleClock.svelte';

	let seconds = 600;
	let active = true;

	let finished = false;
</script>

Nothing here!

<div class="">
	<SimpleClock stopAtZero={true} {active} {seconds} on:timerFinished={() => (finished = true)} />
</div>

<div>{finished ? 'FINISHED!' : '...'}</div>

<div class="mt-4">
	<button class="btn btn-primary mx-4" on:click={() => (active = !active)}>Turn {active ? 'off' : 'on'}</button>
	<button class="btn btn-accent mx-4 my-1" on:click={() => (seconds = 600 + Math.random())}> RESET </button>
</div>