<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Toast } from './Toast';
	import { toasts } from './ToastStore';

	function dismiss(toast: Toast) {
		toasts.update((v) => v.filter((v) => v.id !== toast.id));
	}
</script>

<div class="toast-container">
	{#each $toasts as toast (toast.id) }
		<div class="mb-4" transition:fade>
			<button
				class="alert alert-info shadow-lg mx-auto inline-block w-auto"
				on:click={() => dismiss(toast)}
			>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current flex-shrink-0 w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>{toast.message}</span>
				</div>
			</button>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		@apply fixed bottom-10 left-0 w-full px-40 text-center;
	}
</style>
