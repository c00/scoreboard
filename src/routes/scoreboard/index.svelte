<script lang="ts">
import { browser } from '$app/env';

	import hockey from '$lib/assets/hockey.png';
	import { defaultState,type GameState } from '$lib/GameStores/GameState';
	import { STORAGE_KEY } from '$lib/GameStores/gameStateStore';
	import GoalArrow from '$lib/GoalArrow/GoalArrow.svelte';
	import Goalshots from '$lib/Goalshots/Goalshots.svelte';
	import PenaltyDisplay from '$lib/PenaltyDisplay/PenaltyDisplay.svelte';
	import ScoreSection from '$lib/ScoreSection/ScoreSection.svelte';
	import SimpleClock from '$lib/SegmentClock/SimpleClock.svelte';
	import SegmentDisplay from '$lib/SegmentsDisplay/SegmentDisplay.svelte';
	import { onMount } from 'svelte';

	let state: GameState = defaultState;
	let root: HTMLElement;

	$: mainClock = state.mainClock;

	$: leftGoalArrowColor = state.leftTeam.activeGoal ? 'orange' : '';
	$: rightGoalArrowColor = state.rightTeam.activeGoal ? 'orange' : '';

	onMount(() => {
		const data = localStorage.getItem(STORAGE_KEY);
		if (data) state = JSON.parse(data);

		if (browser) {
			root = document.querySelector(":root");
			root.style.fontSize = `${state.boardSize}px`;
		}
	});

	const storageChanged = (event: StorageEvent) => {
		if (event.key !== STORAGE_KEY) return;
		if (event.oldValue === event.newValue) return;

		state = JSON.parse(event.newValue);

		if (root) {
			root.style.fontSize = `${state.boardSize}px`;
		}
		console.log('New Values', state);
	};
</script>

<svelte:window on:storage={storageChanged} />

<div class="w-full h-full bg-red-800 text-white flex flex-col">
	<!-- Header -->
	<section class="flex gap-3 px-4 pt-8">
		<!-- <div>Ad 1</div> -->

		<div class="grow text-center font-bold text-4xl">{state.title}</div>

		<!-- <div>Ad 2</div> -->
	</section>

	<!-- Main section -->
	<section class="flex gap-3 px-4 my-8 text-center grow">
		<div class="flex-1 flex flex-col justify-between">
			<div class="">
				<ScoreSection team={state.leftTeam} />
			</div>
			<div class="mt-8">
				<PenaltyDisplay team={state.leftTeam} clocksActive={state.mainClock.active} />
			</div>
		</div>

		<div class="flex-1 flex flex-col justify-between">
			<div>
				<SimpleClock
					size="lg"
					color="orange"
					format="  :  "
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
					<SegmentDisplay size="sm" color="green" format=" " value={state.period} />
				</div>
			</div>

			<div class="mt-4 ">
				<Goalshots
					logo={hockey}
					leftValue={state.leftTeam.goalShots}
					rightValue={state.rightTeam.goalShots}
				/>
			</div>
		</div>

		<div class="flex-1 flex flex-col justify-between">
			<div class="">
				<ScoreSection team={state.rightTeam} />
			</div>
			<div class="mt-8">
				<PenaltyDisplay team={state.rightTeam} clocksActive={state.mainClock.active} />
			</div>
		</div>
	</section>
</div>
