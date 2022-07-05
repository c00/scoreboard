<script lang="ts">
	import { getRandomId } from '../Config/randomId';

	const nameId = getRandomId('name');

  export let label: string;
	export let value: string;
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={nameId}>
		<span class="label-text">{label}</span></label>
	<input
		id={nameId}
		bind:value
		type="text"
		name="team-name"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
	/>
</div>
