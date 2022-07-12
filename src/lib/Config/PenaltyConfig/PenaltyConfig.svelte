<script lang="ts">
	import type { TeamState } from '../../GameStores/GameState';
	import PenaltyLine from './PenaltyLine.svelte';

	export let team: TeamState;
</script>

<div class="card bg-slate-50 shadow">
	<div class="card-body">
		<PenaltyLine bind:state={team.penalty1} />
    <hr>
		<PenaltyLine bind:state={team.penalty2} />
	</div>
</div>
