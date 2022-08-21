<script lang="ts">
	export let digit: string = null;
	export let color: string = null;
	export let type = ':';

	$: active = digit === type;
</script>

<svg class="py-1" class:active viewBox="0 0 40 288" fill="none" xmlns="http://www.w3.org/2000/svg">
	<circle class:show={type === '`'} class="a {color}" cx="20" cy="20" r="20" fill="currentColor" />
	<circle class:show={type === ':'} class="b {color}" cx="20" cy="80" r="20" fill="currentColor" />
	<circle class:show={type === ':'} class="c {color}" cx="20" cy="208" r="20" fill="currentColor" />
	<circle class:show={type === '.'} class="d {color}" cx="20" cy="268" r="20" fill="currentColor" />
</svg>

<style lang="scss">
	.active .show {
		@apply text-zinc-200;

		&.green {
			color: var(--scoreboard-success);
		}

		&.red {
			color: var(--scoreboard-warn);
		}

		&.orange {
			color: var(--scoreboard-accent);
		}
	}

	.show {
		@apply text-zinc-700;
	}

	svg {
		@apply text-transparent;
		height: inherit;
	}
</style>
