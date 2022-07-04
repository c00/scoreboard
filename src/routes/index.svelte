<script lang="ts">
	import SimpleClock from '../lib/SegmentClock/SimpleClock.svelte';

	let seconds = 600;
	let active = true;

	let finished = false;
</script>

Nothing here!

<div class="">
	<SimpleClock stopAtZero={true} {active} {seconds} on:timerFinished={() => (finished = true)} />
</div>

<div>{finished ? 'FINISHED!' : '...'}</div>

<br /><br />
<button on:click={() => (active = !active)}>Turn {active ? 'off' : 'on'}</button>

<br /> <br />
<button
	on:click={() => {
		seconds = 600
	}}
>
	RESET
</button>
