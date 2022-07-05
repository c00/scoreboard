<script lang="ts">
	import team1 from '$lib/assets/team1.png';
	import NumberInput from '../../Forms/NumberInput.svelte';
	import TextInput from '../../Forms/TextInput.svelte';
	import type { TeamState } from '../../GameStores/GameState';

	export let team: TeamState;
</script>

<form class="card bg-slate-50 shadow">
	<div class="mx-auto mt-8">
		<img class="w-48 rounded" src={team1} alt="Shoes" />
	</div>
	<div class="card-body">
		<TextInput bind:value={team.name} label="Team name" />
		<NumberInput bind:value={team.score} label="Score" />
		<NumberInput bind:value={team.goalShots} label="Goal Shots" />
	</div>
</form>
