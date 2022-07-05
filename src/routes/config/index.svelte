<script lang="ts">
	import { defaultState, gameState, STORAGE_KEY, type GameState } from '$lib/GameStores/GameState';
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import TeamConfig from '$lib/Config/TeamConfig/TeamConfig.svelte';

	import equal from 'deep-equal';

	let pendingState = writable<GameState>();
	let dirty;

	$: if ($gameState) updateStorage();

	onMount(() => {
		if (!$gameState) {
			//todo move to storage
			//try loading it from storage
			const data = localStorage.getItem(STORAGE_KEY);
			if (!data) {
				gameState.set(defaultState);
			} else {
				const state = JSON.parse(data);
				gameState.set(state);
			}

			$pendingState = structuredClone($gameState);
      setDerivedStore();
		}
	});

	const updateStorage = () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify($gameState));
	};

	const setDerivedStore = () => {
		dirty = derived(pendingState, ($pendingState) => {
			return !equal($gameState, $pendingState);
		});
	};
	const commit = () => {
		$gameState = $pendingState;
    setDerivedStore();
	};

	let counter = 0;
	let showHiddenMessage = false;
	$: if (counter === 10) {
		showHiddenMessage = true;
		setTimeout(() => {
			showHiddenMessage = false;
			counter = 0;
		}, 5000);
	}
</script>

<div class="navbar bg-primary text-primary-content">
	<div class="flex-1">
		<button on:click={() => counter++} class="btn btn-ghost normal-case text-xl">Scoreboard</button>
		{#if showHiddenMessage}
			<span class="ml-4" transition:fade>Stop touching me!</span>
		{/if}
	</div>
	<div class="flex-none mr-4">
		<a href="/scoreboard" class="hover:text-white" target="_blank">open scoreboard</a>
	</div>
</div>

{#if $pendingState}
	<div class="container mx-auto px-4">
		<div class="alert my-4">
			{#if $dirty}
				<div>Click the button to apply the latest updates</div>
				<button on:click={commit} class="btn">update</button>
			{:else}
				<div>Everything is up to date</div>
				<button class="btn">rollback</button>
			{/if}
		</div>
		<div class="flex gap-4 justify-between mt-8 ">
			<div>
				<TeamConfig bind:team={$pendingState.leftTeam} />
			</div>
			<div>
				<!-- <pre>{JSON.stringify($gameState, null, 2)}</pre> -->
				<pre>{JSON.stringify($pendingState, null, 2)}</pre>
			</div>
			<div><TeamConfig bind:team={$pendingState.rightTeam} /></div>
		</div>
	</div>
{/if}
