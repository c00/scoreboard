<script lang="ts">
	import { getRandomId } from '../Config/randomId';

	const nameId = getRandomId('name');

  export let label: string;
	export let value: number;
	export let placeholder: string = 'Enter number'
</script>

<div class="form-control w-full">
	<label class="label" for={nameId}>
		<span class="label-text">{label}</span></label>
	<input
		id={nameId}
		bind:value
		type="number"
		name={nameId}
		{placeholder}
		class="input input-bordered w-full text-right"
	/>
</div>
