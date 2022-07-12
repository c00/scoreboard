<script lang="ts">
	import TeamConfig from '$lib/Config/TeamConfig/TeamConfig.svelte';
	import { derived } from 'svelte/store';
	import { fade } from 'svelte/transition';

	import hockey from '$lib/assets/hockey.png';
	import ClockConfig from '$lib/Config/ClockConfig/ClockConfig.svelte';
	import ImageConfig from '$lib/Config/ImageConfig/ImageConfig.svelte';
	import PeriodConfig from '$lib/Config/PeriodConfig/PeriodConfig.svelte';
	import equal from 'deep-equal';
	import { gameState, pendingState } from '../../lib/GameStores/gameStateStore';
	import DebugGameState from '../../lib/Debug/DebugGameState.svelte';
	import GoalButton from '../../lib/Config/GoalButton/GoalButton.svelte';
	import PenaltyConfig from '../../lib/Config/PenaltyConfig/PenaltyConfig.svelte';

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
		<div class="flex gap-8 mt-8 ">
			<div class="w-1/3">
				<div class="mb-4">
					<GoalButton bind:value={$gameState.leftTeam.activeGoal} />
				</div>
				<div class="mb-4">
					<TeamConfig bind:team={$pendingState.leftTeam} />
				</div>
				<div>
					<h2 class="font-bold text-slate-500 text-center mt-8 mb-2">Penalties</h2>
					<PenaltyConfig bind:team={$pendingState.leftTeam} />
				</div>
			</div>
			<div class="w-1/3">
				<div class="mt-20">
					<ClockConfig bind:clock={$pendingState.mainClock} showStopAtZeroToggle={false} />
				</div>
				<div class="mt-4">
					<PeriodConfig bind:period={$pendingState.period} />
				</div>
				<div class="mt-4">
					<ImageConfig img={hockey} />
				</div>
			</div>
			<div class="w-1/3">
				<div class="mb-4">
					<GoalButton bind:value={$gameState.rightTeam.activeGoal} />
				</div>
				<div class="mb-4">
					<TeamConfig bind:team={$pendingState.rightTeam} />
				</div>
				<div>
					<h2 class="font-bold text-slate-500 text-center mt-8 mb-2">Penalties</h2>
					<PenaltyConfig bind:team={$pendingState.rightTeam} />
				</div>
			</div>
		</div>
	</div>
{/if}

<DebugGameState />
