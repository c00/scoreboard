<script lang="ts">
	import TeamConfig from '$lib/Config/TeamConfig/TeamConfig.svelte';
	import { gameState, type GameState } from '$lib/GameStores/GameState';
	import { derived, writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	import equal from 'deep-equal';
	import ClockConfig from '$lib/Config/ClockConfig/ClockConfig.svelte';
	import PeriodConfig from '$lib/Config/PeriodConfig/PeriodConfig.svelte';
	import ImageConfig from '$lib/Config/ImageConfig/ImageConfig.svelte';
	import hockey from '$lib/assets/hockey.png';

	//Consider moving this to GameState
	// Also consider moving the gamestate store from the GameState.ts into its own thing.
	// Also consider wrapping the whole persistent writable thing into a separate thing.
	// Also consider creating a storageReadable that responds to updated storage.
	const pendingState = writable<GameState>();
	const dirty = derived([pendingState, gameState], ([$pendingState, $gameState]) => {
		return !equal($gameState, $pendingState);
	});

	$: if ($gameState) resetPendingState();

	function resetPendingState() {
		$pendingState = structuredClone($gameState);
	}

	const commit = () => {
		$gameState = structuredClone($pendingState);
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
			<pre>{String($dirty)}</pre>
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
				<div>
					<ClockConfig clock={$pendingState.mainClock} />
				</div>
				<div>
					<PeriodConfig bind:period={$pendingState.period} />
				</div>
				<div>
					<ImageConfig img={hockey} />
				</div>
			</div>
			<div><TeamConfig bind:team={$pendingState.rightTeam} /></div>
		</div>
	</div>
{/if}
