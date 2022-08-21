<script lang="ts">
	import { getRandomId } from '../Config/randomId';

	const nameId = getRandomId('name');

	export let label: string = '';
	export let value: string;
	export let readonly = false;
	export let placeholder = 'Type here';
	export let active = false;
</script>

<div class="form-control w-full">
	{#if label}
		<!-- content here -->
		<label class="label" for={nameId}>
			<span class="label-text" class:active>{label}</span>
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

<style>
	.active {
		@apply font-semibold;
		animation: highlight 4s;
	}

	@keyframes highlight {
		10%,
		50% {
			@apply text-primary;
		}
		100% {
			@apply text-current;
		}
	}
</style>
