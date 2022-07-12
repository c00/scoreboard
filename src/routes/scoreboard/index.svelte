<script lang="ts">
	import ScoreSection from '$lib/ScoreSection/ScoreSection.svelte';
	import SegmentDisplay from '$lib/SegmentsDisplay/SegmentDisplay.svelte';
	import team1 from '$lib/assets/team1.png';
	import team2 from '$lib/assets/team2.png';
	import PenaltyDisplay from '$lib/PenaltyDisplay/PenaltyDisplay.svelte';
	import Goalshots from '$lib/Goalshots/Goalshots.svelte';
	import hockey from '$lib/assets/hockey.png';
	import GoalArrow from '$lib/GoalArrow/GoalArrow.svelte';
	import { defaultState, type GameState } from '$lib/GameStores/GameState';
	import { onMount } from 'svelte';
	import SimpleClock from '$lib/SegmentClock/SimpleClock.svelte';
	import { STORAGE_KEY } from '../../lib/GameStores/gameStateStore';

	let state: GameState = defaultState;

	onMount(() => {
		const data = localStorage.getItem(STORAGE_KEY);
		if (data) state = JSON.parse(data);
	});

	const storageChanged = (event: StorageEvent) => {
		if (event.key !== STORAGE_KEY) return;
		if (event.oldValue === event.newValue) return;

		state = JSON.parse(event.newValue);
	};
</script>

<svelte:window on:storage={storageChanged} />

<div class="w-full h-full bg-red-800 text-white flex flex-col">
	<!-- Header -->
	<section class="flex gap-3 px-4 pt-8">
		<div>Ad 1</div>

		<div class="grow text-center font-bold text-4xl">NATIONAL ASSHOCKEY CHAMPIONSHIP</div>

		<div>Ad 2</div>
	</section>

	<!-- Main section -->
	<section class="flex gap-3 px-4 my-8 text-center grow">
		<div class="flex-1 flex flex-col justify-between">
			<div class="">
				<ScoreSection name={state.leftTeam.name} image={team2} />
			</div>
			<div class="mt-8">
				<PenaltyDisplay />
			</div>
		</div>

		<div class="flex-1 flex flex-col justify-between">
			<div>
				<SimpleClock size="lg" color="orange" format="  :  " seconds={600} />
			</div>

			<div class="flex mt-4 justify-center gap-4 items-center">
				<div class=""><GoalArrow color="orange" direction="left" /></div>
				<div class="text-3xl text-center">GOAL</div>
				<div class=""><GoalArrow direction="right" /></div>
			</div>

			<div class="mt-4">
				<div class="text-3xl mb-2">PERIOD</div>
				<div class="text-center">
					<SegmentDisplay size="sm" color="green" format=" " value={state.period} />
				</div>
			</div>

			<div class="mt-4 ">
				<Goalshots logo={hockey} />
			</div>
		</div>

		<div class="flex-1 flex flex-col justify-between">
			<div class="">
				<ScoreSection name={state.rightTeam.name} image={team1} />
			</div>
			<div class="mt-8">
				<PenaltyDisplay />
			</div>
		</div>
	</section>
</div>
