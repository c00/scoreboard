<script lang="ts">
	import SimpleClock from '$lib/SegmentClock/SimpleClock.svelte';
	import localforage from 'localforage';

	let seconds = 600;
	let active = true;

	let finished = false;

	let files: FileList;

	let imgEl: HTMLImageElement;

	async function load() {
		const dataUrl = await localforage.getItem<string>('some-img');
  	imgEl.src = dataUrl;
	}

	async function store() {
		var reader = new FileReader();

		reader.onload = async (e) => {
			var image = reader.result;

			await localforage.setItem('some-img', image);
			console.log('Stored');
		};

		reader.readAsDataURL(files.item(0));
	}
</script>

Nothing here!

<div class="">
	<SimpleClock stopAtZero={true} {active} {seconds} on:timerFinished={() => (finished = true)} />
</div>

<div>{finished ? 'FINISHED!' : '...'}</div>

<div class="mt-4">
	<button class="btn btn-primary mx-4" on:click={() => (active = !active)}
		>Turn {active ? 'off' : 'on'}</button
	>
	<button class="btn btn-accent mx-4 my-1" on:click={() => (seconds = 600 + Math.random())}>
		RESET
	</button>
</div>

<hr />

<label
	>File thing
	<input bind:files type="file" />
</label>

<button class="btn" on:click={store}>Store stuff</button>

<button class="btn" on:click={load}>Load stuff</button>

<img bind:this={imgEl} alt="meh"/>