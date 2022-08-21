<script lang="ts">
	export let digit: string | number = null;
	export let animate = true;

	$: digitClass = canDisplay(digit) ? `digit-${digit}` : 'no-digit';

	const valid = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '_'];

	const canDisplay = (input: string | number) => {
		return valid.includes(String(input));
	};
</script>

<svg
	class:animate
	class="{$$props.class} {digitClass}"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="-1 -1 12 20"
>
	<g
		xmlns="http://www.w3.org/2000/svg"
		style="fill-rule:evenodd; stroke:#FFFFFF; stroke-width:0.25; stroke-opacity:0; stroke-linecap:butt; stroke-linejoin:miter;"
	>
		<polygon class="a" points=" 1, 1  2, 0  8, 0  9, 1  8, 2  2, 2" fill="currentColor" />
		<polygon class="b" points=" 9, 1 10, 2 10, 8  9, 9  8, 8  8, 2" fill="currentColor" />
		<polygon class="c" points=" 9, 9 10,10 10,16  9,17  8,16  8,10" fill="currentColor" />
		<polygon class="d" points=" 9,17  8,18  2,18  1,17  2,16  8,16" fill="currentColor" />
		<polygon class="e" points=" 1,17  0,16  0,10  1, 9  2,10  2,16" fill="currentColor" />
		<polygon class="f" points=" 1, 9  0, 8  0, 2  1, 1  2, 2  2, 8" fill="currentColor" />
		<polygon class="g" points=" 1, 9  2, 8  8, 8  9, 9  8,10  2,10" fill="currentColor" />
	</g>
</svg>

<style lang="scss">
	.animate polygon {
		@apply transition-colors ease-out duration-100;
	}

	svg {
		@apply text-zinc-700;
		height: inherit;

		&.digit-0 {
			.a,
			.b,
			.c,
			.d,
			.e,
			.f {
				color: var(--scoreboard-text);
			}
		}
		&.digit-1 {
			.b,
			.c {
				color: var(--scoreboard-text);
			}
		}
		&.digit-2 {
			.a,
			.b,
			.d,
			.e,
			.g {
				color: var(--scoreboard-text);
			}
		}
		&.digit-3 {
			.a,
			.b,
			.c,
			.d,
			.g {
				color: var(--scoreboard-text);
			}
		}
		&.digit-4 {
			.b,
			.c,
			.f,
			.g {
				color: var(--scoreboard-text);
			}
		}
		&.digit-5 {
			.a,
			.c,
			.d,
			.f,
			.g {
				color: var(--scoreboard-text);
			}
		}
		&.digit-6 {
			.a,
			.c,
			.d,
			.e,
			.f,
			.g {
				color: var(--scoreboard-text);
			}
		}
		&.digit-7 {
			.a,
			.b,
			.c {
				color: var(--scoreboard-text);
			}
		}
		&.digit-8 {
			.a,
			.b,
			.c,
			.d,
			.e,
			.f,
			.g {
				color: var(--scoreboard-text);
			}
		}
		&.digit-9 {
			.a,
			.b,
			.c,
			.d,
			.f,
			.g {
				color: var(--scoreboard-text);
			}
		}
		&.digit-- {
			.g {
				color: var(--scoreboard-text);
			}
		}
		&.digit-_ {
			.d {
				color: var(--scoreboard-text);
			}
		}
	}

	.red {
		&.digit-0 {
			.a,
			.b,
			.c,
			.d,
			.e,
			.f {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-1 {
			.b,
			.c {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-2 {
			.a,
			.b,
			.d,
			.e,
			.g {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-3 {
			.a,
			.b,
			.c,
			.d,
			.g {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-4 {
			.b,
			.c,
			.f,
			.g {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-5 {
			.a,
			.c,
			.d,
			.f,
			.g {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-6 {
			.a,
			.c,
			.d,
			.e,
			.f,
			.g {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-7 {
			.a,
			.b,
			.c {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-8 {
			.a,
			.b,
			.c,
			.d,
			.e,
			.f,
			.g {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-9 {
			.a,
			.b,
			.c,
			.d,
			.f,
			.g {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-- {
			.g {
				color: var(--scoreboard-warn);
			}
		}
		&.digit-_ {
			.d {
				color: var(--scoreboard-warn);
			}
		}
	}

	.orange {
		&.digit-0 {
			.a,
			.b,
			.c,
			.d,
			.e,
			.f {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-1 {
			.b,
			.c {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-2 {
			.a,
			.b,
			.d,
			.e,
			.g {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-3 {
			.a,
			.b,
			.c,
			.d,
			.g {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-4 {
			.b,
			.c,
			.f,
			.g {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-5 {
			.a,
			.c,
			.d,
			.f,
			.g {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-6 {
			.a,
			.c,
			.d,
			.e,
			.f,
			.g {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-7 {
			.a,
			.b,
			.c {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-8 {
			.a,
			.b,
			.c,
			.d,
			.e,
			.f,
			.g {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-9 {
			.a,
			.b,
			.c,
			.d,
			.f,
			.g {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-- {
			.g {
				color: var(--scoreboard-accent);
			}
		}
		&.digit-_ {
			.d {
				color: var(--scoreboard-accent);
			}
		}
	}

	.green {
		@apply text-zinc-700;

		&.digit-0 {
			.a,
			.b,
			.c,
			.d,
			.e,
			.f {
				color: var(--scoreboard-success);
			}
		}
		&.digit-1 {
			.b,
			.c {
				color: var(--scoreboard-success);
			}
		}
		&.digit-2 {
			.a,
			.b,
			.d,
			.e,
			.g {
				color: var(--scoreboard-success);
			}
		}
		&.digit-3 {
			.a,
			.b,
			.c,
			.d,
			.g {
				color: var(--scoreboard-success);
			}
		}
		&.digit-4 {
			.b,
			.c,
			.f,
			.g {
				color: var(--scoreboard-success);
			}
		}
		&.digit-5 {
			.a,
			.c,
			.d,
			.f,
			.g {
				color: var(--scoreboard-success);
			}
		}
		&.digit-6 {
			.a,
			.c,
			.d,
			.e,
			.f,
			.g {
				color: var(--scoreboard-success);
			}
		}
		&.digit-7 {
			.a,
			.b,
			.c {
				color: var(--scoreboard-success);
			}
		}
		&.digit-8 {
			.a,
			.b,
			.c,
			.d,
			.e,
			.f,
			.g {
				color: var(--scoreboard-success);
			}
		}
		&.digit-9 {
			.a,
			.b,
			.c,
			.d,
			.f,
			.g {
				color: var(--scoreboard-success);
			}
		}
		&.digit-- {
			.g {
				color: var(--scoreboard-success);
			}
		}
		&.digit-_ {
			.d {
				color: var(--scoreboard-success);
			}
		}
	}
</style>
