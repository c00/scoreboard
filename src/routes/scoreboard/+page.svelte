<script lang="ts">
	import { browser } from '$app/env';
	import Ad from '$lib/Ads/Ad.svelte';
	import hockey from '$lib/assets/hockey.png';
	import { defaultState } from '$lib/GameStores/GameState';
	import { STORAGE_KEY } from '$lib/GameStores/gameStateStore';
	import GoalArrow from '$lib/GoalArrow/GoalArrow.svelte';
	import Goalshots from '$lib/Goalshots/Goalshots.svelte';
	import PenaltyDisplay from '$lib/PenaltyDisplay/PenaltyDisplay.svelte';
	import ScoreSection from '$lib/ScoreSection/ScoreSection.svelte';
	import SimpleClock from '$lib/SegmentClock/SimpleClock.svelte';
	import SegmentDisplay from '$lib/SegmentsDisplay/SegmentDisplay.svelte';
	import { storageReadable } from '$lib/Stores/StorageReadable';
	import { scoreboardThemes } from '$lib/Theme/Theme';
	import { onMount, setContext } from 'svelte';

	export const ssr = false;

	setContext('media-update', storageReadable('media-update'));

	let root: HTMLElement;
	const state = storageReadable(STORAGE_KEY, defaultState);

	$: mainClock = $state.useClock === 'main' ? $state.mainClock : $state.altClock;
	$: leftGoalArrowColor = $state.leftTeam.activeGoal ? 'orange' : '';
	$: rightGoalArrowColor = $state.rightTeam.activeGoal ? 'orange' : '';
	$: if ($state && root) setRootProperties();

	onMount(() => {
		if (browser) root = document.querySelector(':root');
	});

	function setRootProperties() {
		root.style.fontSize = `${$state.boardSize}px`;

		//Set Theme
		const theme = scoreboardThemes[$state.boardTheme] || scoreboardThemes.red;

		root.style.setProperty('--scoreboard-background', theme.background);
		root.style.setProperty('--scoreboard-text', theme.text);
		root.style.setProperty('--scoreboard-success', theme.success);
		root.style.setProperty('--scoreboard-accent', theme.accent);
		root.style.setProperty('--scoreboard-warn', theme.warn);
	}
</script>

<svelte:head>
	<title>{$state.title}</title>
</svelte:head>

<div class="w-full h-full board text-white flex flex-col">
	<!-- Header -->
	<section class="flex gap-3 px-4 pt-8 items-center">
		<div class="w-1/5">
			<Ad label="ad-left" alt="Advert 1" />
		</div>

		<div class="grow text-center font-bold text-4xl">{$state.title}</div>

		<div class="w-1/5 text-right">
			<Ad label="ad-right" alt="Advert 2" />
		</div>
	</section>

	<!-- Main section -->
	<section class="flex gap-3 px-4 my-8 text-center grow">
		<div class="flex-1 flex flex-col justify-between">
			<div class="">
				<ScoreSection team={$state.leftTeam} />
			</div>
			<div class="mt-8">
				<PenaltyDisplay team={$state.leftTeam} />
			</div>
		</div>

		<div class="flex-1 flex flex-col justify-between">
			<div>
				<SimpleClock
					size="lg"
					color="orange"
					format="  :  "
					audioLabel="buzzer"
					seconds={mainClock.seconds}
					active={mainClock.active}
					stopAtZero={mainClock.stopAtZero}
				/>
			</div>

			<div class="flex mt-4 justify-center gap-4 items-center">
				<div class=""><GoalArrow color={leftGoalArrowColor} direction="left" /></div>
				<div class="text-3xl text-center">GOAL</div>
				<div class=""><GoalArrow color={rightGoalArrowColor} direction="right" /></div>
			</div>

			<div class="mt-4">
				<div class="text-3xl mb-2">PERIOD</div>
				<div class="text-center">
					<SegmentDisplay size="sm" color="green" format=" " value={$state.period} />
				</div>
			</div>

			<div class="mt-4 ">
				<Goalshots
					logo={hockey}
					leftValue={$state.leftTeam.goalShots}
					rightValue={$state.rightTeam.goalShots}
				/>
			</div>
		</div>

		<div class="flex-1 flex flex-col justify-between">
			<div class="">
				<ScoreSection team={$state.rightTeam} />
			</div>
			<div class="mt-8">
				<PenaltyDisplay team={$state.rightTeam} />
			</div>
		</div>
	</section>
</div>

<style>
	.board {
		background-color: var(--scoreboard-background);
		color: var(--scoreboard-text);
	}
</style>
