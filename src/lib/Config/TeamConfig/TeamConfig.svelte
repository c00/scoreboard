<script lang="ts">
	import NumberInput from '../../Forms/NumberInput.svelte';
	import TextInput from '../../Forms/TextInput.svelte';
	import type { TeamState } from '../../GameStores/GameState';
	import ImageConfig from '../ImageConfig/ImageConfig.svelte';

	export let team: TeamState;
</script>

<div class="card bg-slate-50 shadow">
	<div class="mx-auto mt-8">
		<ImageConfig name="team-{team.side}" />
	</div>
	<div class="card-body">
		<TextInput bind:value={team.name} label="Team name" />
		<NumberInput bind:value={team.score} label="Score" />
		<NumberInput bind:value={team.goalShots} label="Goal Shots" />
	</div>
</div>
