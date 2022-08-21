<script lang="ts">
	import { browser } from '$app/env';
	import localforage from 'localforage';
	import { createEventDispatcher } from 'svelte';
	import { getRandomId } from '../randomId';
	import AudioIcon from './AudioIcon.svelte';
	import { readFile } from './FileHelper';

	export let label: string;
	export let name: string;

	const dispatch = createEventDispatcher();

	let fileEl: HTMLInputElement;
	let audioEl: HTMLAudioElement;
	let files: FileList;
	let src: string;
	let inputId = getRandomId('file');
	let playing = false;

	$: if (files) saveFile();
	$: if (name && browser) setDataUrl();

	function playToggle() {
		if (!audioEl) return;
		if (audioEl.paused) {
			audioEl.play();
		} else {
			audioEl.pause();
			audioEl.currentTime = 0;
		}
	}

	async function setDataUrl() {
		const data = await localforage.getItem<string>(name);
		if (data) src = data;
	}

	async function saveFile() {
		if (files.length === 0) return;
		const data = await readFile(files.item(0));

		await localforage.setItem(name, data);
		localStorage.setItem('media-update', String(new Date()));
		dispatch('audio-saved', { name });
		src = data;
	}
</script>

<div class="card bg-base-200">
	<div class="card-body p-4">
		<div class="flex gap-4 items-center">
			<div>
				<div class="rounded-full bg-slate-300 p-2">
					<AudioIcon />
				</div>
			</div>
			<div>
				<h2 class="card-title">{label}</h2>
				<div>
					<button type="button" class="btn btn-xs btn-ghost" on:click={playToggle} disabled={!src}>
						{playing ? 'Pause' : 'Play'}
					</button>
				</div>
				<div>
					<button type="button" class="btn btn-xs btn-ghost" on:click={() => fileEl.click()}>
						{src ? 'update sound' : 'set sound'}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<input id={inputId} type="file" bind:files class="hidden" bind:this={fileEl} accept=".mp3,.wav" />
<audio
	on:playing={() => (playing = true)}
	on:pause={() => (playing = false)}
	{src}
	bind:this={audioEl}
/>
