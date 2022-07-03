<script lang="ts">
	import Dots from './Dots.svelte';
	import { inputToSegmentValue } from './SegmentDisplayHelpers';

	import SevenSegment from './SevenSegment.svelte';

	export let color: string = null;
	export let length: number = 6;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let value: string | number = null;

	$: segments = inputToSegmentValue(value, length);
	const dotChars = ['.', ':', '`'];
</script>

<div class="inline-block">
	<div class="flex gap-1 px-1 py-1 rounded-lg segments {color}">
		{#each segments as s}
			<span class="segment {size}">
				{#if dotChars.includes(s)}
					<Dots {color} digit={s} />
				{:else}
					<SevenSegment class={color} digit={s} />
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
