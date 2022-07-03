<script lang="ts">
	export let digit: string | number = null;

	$: digitClass = canDisplay(digit) ? `digit-${digit}` : 'no-digit';

	const valid = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '_'];

	const canDisplay = (input: string | number) => {
		return valid.includes(String(input));
	};
</script>

<svg class="{$$props.class} {digitClass}" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 12 20">
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
				@apply text-slate-200;
			}
		}
		&.digit-1 {
			.b,
			.c {
				@apply text-slate-200;
			}
		}
		&.digit-2 {
			.a,
			.b,
			.d,
			.e,
			.g {
				@apply text-slate-200;
			}
		}
		&.digit-3 {
			.a,
			.b,
			.c,
			.d,
			.g {
				@apply text-slate-200;
			}
		}
		&.digit-4 {
			.b,
			.c,
			.f,
			.g {
				@apply text-slate-200;
			}
		}
		&.digit-5 {
			.a,
			.c,
			.d,
			.f,
			.g {
				@apply text-slate-200;
			}
		}
		&.digit-6 {
			.a,
			.c,
			.d,
			.e,
			.f,
			.g {
				@apply text-slate-200;
			}
		}
		&.digit-7 {
			.a,
			.b,
			.c {
				@apply text-slate-200;
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
				@apply text-slate-200;
			}
		}
		&.digit-9 {
			.a,
			.b,
			.c,
			.d,
			.f,
			.g {
				@apply text-slate-200;
			}
		}
		&.digit-- {
			.g {
				@apply text-slate-200;
			}
		}
		&.digit-_ {
			.d {
				@apply text-slate-200;
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
				@apply text-red-700;
			}
		}
		&.digit-1 {
			.b,
			.c {
				@apply text-red-700;
			}
		}
		&.digit-2 {
			.a,
			.b,
			.d,
			.e,
			.g {
				@apply text-red-700;
			}
		}
		&.digit-3 {
			.a,
			.b,
			.c,
			.d,
			.g {
				@apply text-red-700;
			}
		}
		&.digit-4 {
			.b,
			.c,
			.f,
			.g {
				@apply text-red-700;
			}
		}
		&.digit-5 {
			.a,
			.c,
			.d,
			.f,
			.g {
				@apply text-red-700;
			}
		}
		&.digit-6 {
			.a,
			.c,
			.d,
			.e,
			.f,
			.g {
				@apply text-red-700;
			}
		}
		&.digit-7 {
			.a,
			.b,
			.c {
				@apply text-red-700;
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
				@apply text-red-700;
			}
		}
		&.digit-9 {
			.a,
			.b,
			.c,
			.d,
			.f,
			.g {
				@apply text-red-700;
			}
		}
		&.digit-- {
			.g {
				@apply text-red-700;
			}
		}
		&.digit-_ {
			.d {
				@apply text-red-700;
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
				@apply text-amber-600;
			}
		}
		&.digit-1 {
			.b,
			.c {
				@apply text-amber-600;
			}
		}
		&.digit-2 {
			.a,
			.b,
			.d,
			.e,
			.g {
				@apply text-amber-600;
			}
		}
		&.digit-3 {
			.a,
			.b,
			.c,
			.d,
			.g {
				@apply text-amber-600;
			}
		}
		&.digit-4 {
			.b,
			.c,
			.f,
			.g {
				@apply text-amber-600;
			}
		}
		&.digit-5 {
			.a,
			.c,
			.d,
			.f,
			.g {
				@apply text-amber-600;
			}
		}
		&.digit-6 {
			.a,
			.c,
			.d,
			.e,
			.f,
			.g {
				@apply text-amber-600;
			}
		}
		&.digit-7 {
			.a,
			.b,
			.c {
				@apply text-amber-600;
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
				@apply text-amber-600;
			}
		}
		&.digit-9 {
			.a,
			.b,
			.c,
			.d,
			.f,
			.g {
				@apply text-amber-600;
			}
		}
		&.digit-- {
			.g {
				@apply text-amber-600;
			}
		}
		&.digit-_ {
			.d {
				@apply text-amber-600;
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
				@apply text-green-700;
			}
		}
		&.digit-1 {
			.b,
			.c {
				@apply text-green-700;
			}
		}
		&.digit-2 {
			.a,
			.b,
			.d,
			.e,
			.g {
				@apply text-emerald-500;
			}
		}
		&.digit-3 {
			.a,
			.b,
			.c,
			.d,
			.g {
				@apply text-green-700;
			}
		}
		&.digit-4 {
			.b,
			.c,
			.f,
			.g {
				@apply text-green-700;
			}
		}
		&.digit-5 {
			.a,
			.c,
			.d,
			.f,
			.g {
				@apply text-green-700;
			}
		}
		&.digit-6 {
			.a,
			.c,
			.d,
			.e,
			.f,
			.g {
				@apply text-green-700;
			}
		}
		&.digit-7 {
			.a,
			.b,
			.c {
				@apply text-green-700;
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
				@apply text-green-700;
			}
		}
		&.digit-9 {
			.a,
			.b,
			.c,
			.d,
			.f,
			.g {
				@apply text-green-700;
			}
		}
		&.digit-- {
			.g {
				@apply text-green-700;
			}
		}
		&.digit-_ {
			.d {
				@apply text-green-700;
			}
		}
	}
</style>
