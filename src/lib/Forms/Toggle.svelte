<script lang="ts">
	export let label: string;
	export let checked: boolean;
	export let color = 'primary';
</script>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text">{label}</span>
		<input type="checkbox" class="toggle toggle-{color}" bind:checked />
	</label>
</div>
