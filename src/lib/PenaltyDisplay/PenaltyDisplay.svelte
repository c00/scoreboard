<script lang="ts">
	import type { Clock, TeamState } from '../GameStores/GameState';
	import SimpleClock from '../SegmentClock/SimpleClock.svelte';
	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';

	export let team: TeamState;

	const inactive: { player: number; clock: Clock } = {
		player: null,
		clock: { seconds: null, active: false, startedAt: 1, stopAtZero: true },
	};

	$: p1 =
		team.penalty1.player && team.penalty1.clock.seconds
			? { player: team.penalty1.player, clock: team.penalty1.clock }
			: inactive;

	$: p2 =
		team.penalty2.player && team.penalty2.clock.seconds
			? { player: team.penalty2.player, clock: team.penalty2.clock }
			: inactive;
</script>

<div class="justify-center flex">
	<div>
		<div class="text-3xl">PLAYER</div>
		<div>
			<SegmentDisplay size="sm" color="orange" format="  " value={p1.player} />
		</div>
		<div>
			<SegmentDisplay size="sm" color="orange" format="  " value={p2.player} />
		</div>
	</div>

	<div>
		<div class="text-3xl">PENALTY</div>
		<div>
			<SimpleClock
				size="sm"
				color="red"
				format="  :  "
				seconds={p1.clock.seconds}
				active={p1.clock.active}
			/>
		</div>
		<div>
			<SimpleClock
				size="sm"
				color="red"
				format="  :  "
				seconds={p2.clock.seconds}
				active={p2.clock.active}
			/>
		</div>
	</div>
</div>
