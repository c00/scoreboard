<script lang="ts">
	import ClockConfig from '$lib/Config/ClockConfig/ClockConfig.svelte';
	import GoalButton from '$lib/Config/GoalButton/GoalButton.svelte';
	import AudioConfig from '$lib/Config/ImageConfig/AudioConfig.svelte';
	import ImageConfig from '$lib/Config/ImageConfig/ImageConfig.svelte';
	import PenaltyConfig from '$lib/Config/PenaltyConfig/PenaltyConfig.svelte';
	import PeriodConfig from '$lib/Config/PeriodConfig/PeriodConfig.svelte';
	import TeamConfig from '$lib/Config/TeamConfig/TeamConfig.svelte';
	import DebugGameState from '$lib/Debug/DebugGameState.svelte';
	import SliderInput from '$lib/Forms/SliderInput.svelte';
	import TextInput from '$lib/Forms/TextInput.svelte';
	import { gameState,pendingState } from '$lib/GameStores/gameStateStore';
	import Navbar from '$lib/Navbar/Navbar.svelte';
	import equal from 'deep-equal';
	import { cloneDeep } from 'lodash-es';
	import { derived } from 'svelte/store';

	const dirty = derived([pendingState, gameState], ([$pendingState, $gameState]) => {
		return !equal($gameState, $pendingState);
	});

	$: if ($gameState) resetPendingState();

	function resetPendingState() {
		$pendingState = cloneDeep($gameState);
	}

	const commit = () => {
		$gameState = cloneDeep($pendingState);
	};
</script>

<Navbar />

{#if $pendingState}
	<form class="container mx-auto px-4 pb-10">
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
				<div class="alert sticky top-2 transition-colors mb-4" class:alert-warning={$dirty}>
					{#if $dirty}
						<div>Click the button to apply your changes</div>
						<button type="submit" on:click={commit} class="btn btn-secondary">apply</button>
					{:else}
						<div>Everything is up to date</div>
						<button type="button" disabled class="btn">apply</button>
					{/if}
				</div>
				<div class="mt-10">
					<TextInput bind:value={$pendingState.title} label="Title" />
				</div>
				<div class="mt-4">
					<ClockConfig bind:clock={$pendingState.mainClock} showStopAtZeroToggle={false} />
				</div>
				<div class="mt-4">
					<PeriodConfig bind:period={$pendingState.period} />
				</div>
				<div class="mt-4">
					<ImageConfig label="Main Logo" name="main-logo" />
				</div>
				<div class="mt-4">
					<hr class="my-4 block" />
					<SliderInput min={10} max={30} bind:value={$pendingState.boardSize} label="Board Size" />
				</div>
				<div class="mt-4">
					<AudioConfig label="Clock Buzzer" name="buzzer" />
				</div>
				<div class="mt-4">
					<AudioConfig label="Goal Horn" name="horn" />
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
	</form>
{/if}

<DebugGameState />
