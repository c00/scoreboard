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
	import { gameState, pendingState } from '$lib/GameStores/gameStateStore';
	import { currentEvent, HotkeyAction } from '$lib/hotkeys/hotkeyStore';
	import Listener from '$lib/hotkeys/Listener.svelte';
	import Navbar from '$lib/Navbar/Navbar.svelte';
	import equal from 'deep-equal';
	import { cloneDeep } from 'lodash-es';
	import { DateTime } from 'luxon';
	import { derived } from 'svelte/store';
	import AdConfig from '../../lib/Ads/AdConfig.svelte';
	import SelectInput from '../../lib/Forms/SelectInput.svelte';
	import type { Clock } from '../../lib/GameStores/GameState';
	import { scoreboardThemes } from '../../lib/Theme/Theme';
	import Toasts from '../../lib/Toasts/Toasts.svelte';
	import { addToast } from '../../lib/Toasts/ToastStore';

	export const ssr = false;

	const dirty = derived([pendingState, gameState], ([$pendingState, $gameState]) => {
		return !equal($gameState, $pendingState);
	});

	const themes = Object.keys(scoreboardThemes);

	$: if ($gameState) resetPendingState();
	$: if ($currentEvent === HotkeyAction.TOGGLE_ALL_CLOCKS) toggleAllClocks();
	$: if ($currentEvent === HotkeyAction.TOGGLE_MAIN_CLOCK) toggleMainClock();
	$: if ($currentEvent === HotkeyAction.COMMIT) commit();
	$: if (
		[
			HotkeyAction.TOGGLE_PENALTY_CLOCK_1_LEFT,
			HotkeyAction.TOGGLE_PENALTY_CLOCK_2_LEFT,
			HotkeyAction.TOGGLE_PENALTY_CLOCK_1_RIGHT,
			HotkeyAction.TOGGLE_PENALTY_CLOCK_2_RIGHT,
			HotkeyAction.TOGGLE_ALL_PENALTY_CLOCKS,
		].includes($currentEvent)
	)
		togglePenaltyClock();

	$: selectedClock =
		$pendingState.useClock === 'alt' ? $pendingState.altClock : $pendingState.mainClock;

	function resetPendingState() {
		$pendingState = cloneDeep($gameState);
	}

	function setClockTimes(conf: Clock, prev: Clock) {
		if (!conf || !prev) return;

		if (!prev.active && conf.active) {
			conf.startedAt = DateTime.now().toSeconds();
		} else if (prev.active && !conf.active) {
			const runningFor = DateTime.now().toSeconds() - prev.startedAt;
			conf.seconds -= runningFor;
			if (conf.seconds <= 0) {
				conf.seconds = 0;
			}
		}
	}

	const commit = () => {
		//Alt clocks don't run.
		if ($pendingState.useClock === 'main') {
			$pendingState.altClock.active = false;
		} else {
			$pendingState.mainClock.active = false;
		}

		setClockTimes($pendingState.mainClock, $gameState.mainClock);
		setClockTimes($pendingState.altClock, $gameState.altClock);

		//Save state for Penalty Clocks
		setClockTimes($pendingState.leftTeam.penalty1.clock, $gameState.leftTeam.penalty1.clock);
		setClockTimes($pendingState.leftTeam.penalty2.clock, $gameState.leftTeam.penalty2.clock);
		setClockTimes($pendingState.rightTeam.penalty1.clock, $gameState.rightTeam.penalty1.clock);
		setClockTimes($pendingState.rightTeam.penalty2.clock, $gameState.rightTeam.penalty2.clock);

		$gameState = cloneDeep($pendingState);
		$currentEvent = null;
	};

	const openScoreboard = () => {
		window.open('/scoreboard');
	};

	const toggleAllClocks = () => {
		const state = !selectedClock.active;
		selectedClock.active = state;
		if ($pendingState.leftTeam.penalty1.player)
			$pendingState.leftTeam.penalty1.clock.active = state;
		if ($pendingState.leftTeam.penalty2.player)
			$pendingState.leftTeam.penalty2.clock.active = state;
		if ($pendingState.rightTeam.penalty1.player)
			$pendingState.rightTeam.penalty1.clock.active = state;
		if ($pendingState.rightTeam.penalty2.player)
			$pendingState.rightTeam.penalty2.clock.active = state;
		commit();
		$currentEvent = null;

		if (state) {
			addToast('All clocks started');
		} else {
			addToast('All clocks stopped');
		}
	};

	const toggleMainClock = () => {
		const selectedClock =
			$pendingState.useClock === 'alt' ? $pendingState.altClock : $pendingState.mainClock;
		selectedClock.active = !selectedClock.active;
		commit();
		$currentEvent = null;

		if (selectedClock.active) {
			addToast('Main clocks started');
		} else {
			addToast('Main clocks stopped');
		}
	};

	const togglePenaltyClock = () => {
		let clockName: string;
		let state: boolean;
		switch ($currentEvent) {
			case HotkeyAction.TOGGLE_PENALTY_CLOCK_1_LEFT:
				state = !$pendingState.leftTeam.penalty1.clock.active;
				$pendingState.leftTeam.penalty1.clock.active = state;
				clockName = 'Penalty clock 1 (Left)';
				break;
			case HotkeyAction.TOGGLE_PENALTY_CLOCK_2_LEFT:
				state = !$pendingState.leftTeam.penalty2.clock.active;
				$pendingState.leftTeam.penalty2.clock.active = state;
				clockName = 'Penalty clock 2 (Left)';
				break;
			case HotkeyAction.TOGGLE_PENALTY_CLOCK_1_RIGHT:
				state = !$pendingState.rightTeam.penalty1.clock.active;
				$pendingState.rightTeam.penalty1.clock.active = state;
				clockName = 'Penalty clock 1 (Right)';
				break;
			case HotkeyAction.TOGGLE_PENALTY_CLOCK_2_RIGHT:
				state = !$pendingState.rightTeam.penalty2.clock.active;
				$pendingState.rightTeam.penalty2.clock.active = state;
				clockName = 'Penalty clock 2 (Right)';
				break;
			case HotkeyAction.TOGGLE_ALL_PENALTY_CLOCKS:
				state = !$pendingState.leftTeam.penalty1.clock.active;
				$pendingState.leftTeam.penalty1.clock.active = state;
				$pendingState.leftTeam.penalty2.clock.active = state;
				$pendingState.rightTeam.penalty1.clock.active = state;
				$pendingState.rightTeam.penalty2.clock.active = state;
				clockName = 'All Penalty Clocks';
				break;
			default:
				return;
		}

		commit();
		$currentEvent = null;

		addToast(`${clockName} ${state ? 'started' : 'stopped'}`);
	};
</script>

<Navbar>
	<svelte:fragment slot="links">
		<a href="/config/hotkeys" class="hover:text-white">hotkeys</a>
		<a
			on:click|preventDefault={openScoreboard}
			href="/scoreboard"
			class="hover:text-white"
			target="_blank">open scoreboard</a
		>
	</svelte:fragment>
</Navbar>

{#if $pendingState}
	<form class="container mx-auto px-4 pb-10">
		<div class="flex gap-8 mt-8 ">
			<div class="w-1/3">
				<div class="mb-4">
					<GoalButton bind:value={$gameState.leftTeam.activeGoal} side="left" />
				</div>
				<div class="mb-4">
					<TeamConfig bind:team={$pendingState.leftTeam} />
				</div>
				<div>
					<h2 class="font-bold text-slate-500 text-center mt-8 mb-2">Penalties</h2>
					<PenaltyConfig bind:team={$pendingState.leftTeam} />
				</div>
				<div>
					<h2 class="font-bold text-slate-500 text-center mt-8 mb-2">Advert</h2>
					<AdConfig label="Left Advert" name="ad-left" />
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
				<div class="mt-2">
					<button type="button" on:click={toggleAllClocks} class="btn btn-block btn-ghost">
						{#if selectedClock.active}
							Stop all clocks
						{:else}
							Resume all clocks
						{/if}
					</button>
				</div>
				<div class="mt-10">
					<TextInput bind:value={$pendingState.title} label="Title" />
				</div>
				<div class="mt-4">
					<ClockConfig
						bind:clock={$pendingState.mainClock}
						bind:altClock={$pendingState.altClock}
						bind:useClock={$pendingState.useClock}
						showStopAtZeroToggle={false}
					/>
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
					<SelectInput bind:value={$pendingState.boardTheme} label="Board Theme" options={themes} />
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
					<GoalButton bind:value={$gameState.rightTeam.activeGoal} side="right" />
				</div>
				<div class="mb-4">
					<TeamConfig bind:team={$pendingState.rightTeam} />
				</div>
				<div>
					<h2 class="font-bold text-slate-500 text-center mt-8 mb-2">Penalties</h2>
					<PenaltyConfig bind:team={$pendingState.rightTeam} />
				</div>
				<div>
					<h2 class="font-bold text-slate-500 text-center mt-8 mb-2">Advert</h2>
					<AdConfig label="Right Advert" name="ad-right" />
				</div>
			</div>
		</div>
	</form>
{/if}

<Listener />
<DebugGameState />
<Toasts />
