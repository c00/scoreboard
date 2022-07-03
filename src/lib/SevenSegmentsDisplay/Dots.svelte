<script lang="ts">
	export let digit: string = null;
	export let color: string = null;
</script>

<svg
	class="{color} py-1"
	class:dot={digit === '.'}
	class:colon={digit === ':'}
	class:backtick={digit === '`'}
	viewBox="0 0 40 288"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle class="a" cx="20" cy="20" r="20" fill="currentColor" />
	<circle class="b" cx="20" cy="80" r="20" fill="currentColor" />
	<circle class="c" cx="20" cy="208" r="20" fill="currentColor" />
	<circle class="d" cx="20" cy="268" r="20" fill="currentColor" />
</svg>

<style lang="scss">
	svg {
		@apply text-transparent;
		height: inherit;

		&.dot {
			.d {
				@apply text-slate-700;
			}
		}
		&.colon {
			.b,
			.c {
				@apply text-slate-700;
			}
		}
		&.backtick {
			.a {
				@apply text-slate-700;
			}
		}
	}

	.red {
		&.dot {
			.d {
				@apply text-red-700;
			}
		}
		&.colon {
			.b,
			.c {
				@apply text-red-700;
			}
		}
		&.backtick {
			.a {
				@apply text-red-700;
			}
		}
	}

  .orange {
		&.dot {
			.d {
				@apply text-amber-600;
			}
		}
		&.colon {
			.b,
			.c {
				@apply text-amber-600;
			}
		}
		&.backtick {
			.a {
				@apply text-amber-600;
			}
		}
	}

	.green {
		&.dot {
			.d {
				@apply text-green-700;
			}
		}
		&.colon {
			.b,
			.c {
				@apply text-green-700;
			}
		}
		&.backtick {
			.a {
				@apply text-green-700;
			}
		}
	}
</style>
