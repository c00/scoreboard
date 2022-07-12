<script lang="ts">
	import { getRandomId } from '../Config/randomId';

	const nameId = getRandomId('name');

  export let label: string;
	export let value: string;
	export let placeholder: string = 'Type here';
</script>

<div class="form-control w-full">
	<label class="label" for={nameId}>
		<span class="label-text">{label}</span></label>
	<input
		id={nameId}
		bind:value
		type="text"
		name={nameId}
		{placeholder}
		class="input input-bordered w-full "
	/>
</div>
