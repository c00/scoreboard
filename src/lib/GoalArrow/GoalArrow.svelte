<script lang="ts">
	import { browser } from '$app/env';
	import localforage from 'localforage';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	export let direction: 'left' | 'right';
	export let color: string = null;

	let audioEl: HTMLAudioElement;
	let horn: string;

	const mediaUpdate = getContext<Readable<string>>('media-update');

	$: if ($mediaUpdate) loadAudio();
	$: if (color === 'orange' && audioEl && horn) audioEl.play();

	async function loadAudio() {
		if (!browser) return;
		horn = await localforage.getItem('horn');
	}
</script>

<div class="text-zinc-700 aspect-square rounded-lg bg-slate-900 {color}">
	<svg
		class="{direction} scale-75 w-12 h-12"
		viewBox="0 0 123 106"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M61.5 0L122.555 105.75H0.44521L61.5 0Z" fill="currentColor" />
	</svg>
</div>

<audio src={horn} bind:this={audioEl} />

<style>
	.left {
		@apply -rotate-90;
	}
	.right {
		@apply rotate-90;
	}

	.slate {
		@apply text-slate-600;
	}

	.green {
		color: var(--scoreboard-success);
	}

	.red {
		color: var(--scoreboard-warn);
	}

	.orange {
		color: var(--scoreboard-accent);
	}
</style>
