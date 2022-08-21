<script lang="ts">
	import Dots from './Dots.svelte';
	import { inputToSegmentValue } from './SegmentDisplayHelpers';
	import SevenSegment from './SevenSegment.svelte';

	export let color: string = null;
	export let format = '  :  ';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let value: string | number = null;

	export let animate = true;

	$: formatArr = format.split('');
	$: segments = inputToSegmentValue(value, format.length);

	const dots = [':', '.', '`'];
</script>

<div class="inline-block">
	<div class="flex gap-1 px-1 py-1 rounded-lg segments {color}">
		{#each formatArr as s, i}
			<span class="segment {size}">
				{#if dots.includes(s)}
					<Dots {color} digit={segments[i]} type={s} />
				{:else}
					<SevenSegment {animate} class={color} digit={segments[i]} />
				{/if}
			</span>
		{/each}
	</div>
</div>

<style lang="scss">
	.segment {
		&.sm {
			@apply h-16;
		}

		&.md {
			@apply h-20;
		}

		&.lg {
			@apply h-24;
		}
	}

	.segments {
		@apply bg-slate-900;
	}
</style>
