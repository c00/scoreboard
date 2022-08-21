<script lang="ts">
	import { browser } from '$app/env';
	import localforage from 'localforage';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	export let label: string;
	export let alt: string;

	const mediaUpdate = getContext<Readable<string>>('media-update');

	let src: string;

	$: if (browser && label && $mediaUpdate) setDataUrl();

	async function setDataUrl() {
		const data = await localforage.getItem<string>(label);
		src = data;
	}
</script>

{#if src}
<div class="h-28">
  <img class="max-h-full max-w-full w-auto h-auto mx-auto" {src} {alt} />
</div>
{/if}
