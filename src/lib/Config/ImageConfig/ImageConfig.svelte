<script lang="ts">
	import { browser } from '$app/env';

	import localforage from 'localforage';
	import { createEventDispatcher } from 'svelte';
	import { readFile } from './FileHelper';
	import hockey from '$lib/assets/hockey.png';
	import { getRandomId } from '../randomId';

	export let label: string = null;
	export let name: string;

	const dispatch = createEventDispatcher();

	let fileEl: HTMLInputElement;
	let files: FileList;
	let src: string = hockey;
	let inputId = getRandomId('file');

	$: if (files) saveFile();
	$: if (name && browser) setDataUrl();

	async function setDataUrl() {
		const data = await localforage.getItem<string>(name);
		if (data) src = data;
	}

	async function saveFile() {
		if (files.length === 0) return;
		const data = await readFile(files.item(0));

		await localforage.setItem(name, data);
		localStorage.setItem('media-update', String(new Date()));
		dispatch('image-saved', { name });
		src = data;
	}
</script>

{#if label}
	<div class="text-center">
		<label class="mb-1" for={inputId}>{label}</label>
	</div>
{/if}
<button type="button" class="mx-auto block" on:click={() => fileEl.click()}>
	<img class="w-48 rounded" {src} alt="Image for {name}" />
</button>

<input
	id={inputId}
	type="file"
	bind:files
	class="hidden"
	bind:this={fileEl}
	accept=".png,.jpg,.jpeg,.svg"
/>
