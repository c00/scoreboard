<script lang="ts">
	import { getRandomId } from '../Config/randomId';

	const nameId = getRandomId('name');

	export let label: string;
	export let value: number;
	export let min = 0;
	export let max = 50;
</script>

<div class="form-control w-full">
	<label class="label" for={nameId}>
		<span class="label-text">{label}</span>
		<span>{value}</span>
	</label>
	<input id={nameId} bind:value type="range" {min} {max} name={nameId} class="range" />
</div>
