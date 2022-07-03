<script lang="ts">
	export let direction: 'left' | 'right';
  export let color: string = null;
</script>

<div class="text-zinc-700 aspect-square rounded-lg bg-slate-900 {color}">
	<svg
		class="{direction} scale-75 w-12 h-12"
		viewBox="0 0 123 106"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M61.5 0L122.555 105.75H0.44521L61.5 0Z" fill="currentColor" />
	</svg>
</div>

<style>
	.left {
		@apply -rotate-90;
	}
	.right {
		@apply rotate-90;
	}

  .orange {
    @apply text-amber-600;
  }

  .slate {
    @apply text-slate-600;
  }

  .red {
    @apply text-red-600;
  }
</style>
