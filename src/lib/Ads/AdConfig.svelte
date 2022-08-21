<script lang="ts">
	import ImageConfig from '../Config/ImageConfig/ImageConfig.svelte';

	export let label: string = null;
	export let name: string;
</script>

<div class="card bg-slate-50 shadow">
	<div class="card-body">
		<ImageConfig {label} {name} canRemove={true} />
	</div>
</div>
