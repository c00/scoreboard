<script lang="ts">
	import InlineNumberInput from '../../Forms/InlineNumberInput.svelte';

	export let period = 1;
</script>

<InlineNumberInput bind:value={period} label="Period" />
