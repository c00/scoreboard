<script lang="ts">
	import { browser } from '$app/env';
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';
	import { gameState, pendingState } from '../GameStores/gameStateStore';

	export let show = false;

	onMount(() => {
		if (browser) {
			hotkeys('ctrl+`', function (event) {
				event.preventDefault();
				show = !show;
			});

			return () => hotkeys.unbind('ctrl+`');
		}
	});
</script>

{#if show}
	<div class="border border-slate-700 flex m-8 p-8 rounded-xl bg-white gap-2 justify-around">
		<div>
			<div class="mb-1 text-slate-500 italic">Current State</div>
			<pre>{JSON.stringify($gameState, null, 2)}</pre>
		</div>
		<div>
			<div class="mb-1 text-slate-500 italic">Pending State</div>
			<pre>{JSON.stringify($pendingState, null, 2)}</pre>
		</div>
	</div>
{/if}
