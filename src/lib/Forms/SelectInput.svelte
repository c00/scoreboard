<script lang="ts">
	import { getRandomId } from '../Config/randomId';

	export let options: string[];
	export let label: string = '';
	export let value: string;

	const nameId = getRandomId('name');
</script>

<div class="form-control w-full">
	{#if label}
		<label class="label" for={nameId}>
			<span class="label-text">{label}</span>
		</label>
	{/if}

	<select id={nameId} bind:value class="select select-bordered w-full">
		{#each options as o}
			<option value={o}>{o}</option>
		{/each}
	</select>
</div>
