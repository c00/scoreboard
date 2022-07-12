<script lang="ts">
	import { getRandomId } from '../Config/randomId';

	const nameId = getRandomId('name');

	export let label: string;
	export let value: number;
</script>

<div class="flex gap-2">
	<div class="grow">
		<label class="label" for={nameId}>
			<span class="label-text">{label}</span>
		</label>
	</div>
	<div>
		<input
			id={nameId}
			bind:value
			type="number"
			name="team-name"
			placeholder="Type here"
			class="w-28 input input-bordered text-right"
		/>
	</div>
</div>
