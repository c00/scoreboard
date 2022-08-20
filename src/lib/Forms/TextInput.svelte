<script lang="ts">
	import { getRandomId } from '../Config/randomId';

	const nameId = getRandomId('name');

	export let label: string = '';
	export let value: string;
	export let readonly = false;
	export let placeholder: string = 'Type here';
</script>

<div class="form-control w-full">
	{#if label}
		<!-- content here -->
		<label class="label" for={nameId}>
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		id={nameId}
		bind:value
		{readonly}
		type="text"
		name={nameId}
		{placeholder}
		class="input input-bordered w-full "
	/>
</div>
