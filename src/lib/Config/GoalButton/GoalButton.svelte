<script lang="ts">
	export let label: string = 'GOAL';
	export let value: boolean;

	export let timeout = 2000;
	export let useTimeout = true;

	let timeoutId: ReturnType<typeof setTimeout>;

	function click() {
		if (value === true) {
			clearTimeout(timeoutId);
			value = false;
			return;
		}

		value = true;

		if (useTimeout) {
			timeoutId = setTimeout(() => {
				value = false;
			}, timeout);
		}
	}
</script>

<button class="btn btn-block btn-accent" type="button" on:click={click}>{label}</button>
