<script lang="ts">
	import HotkeyConfigForm from '../../lib/hotkeys/HotkeyConfigForm.svelte';
	import { defaultHotkeys, hotkeyStore } from '../../lib/hotkeys/hotkeyStore';

	import Navbar from '../../lib/Navbar/Navbar.svelte';

	function reset() {
		hotkeyStore.set(defaultHotkeys);
	}
</script>

<Navbar>
	<svelte:fragment slot="links">
		<a href="/config" class="hover:text-white">back to config</a>
	</svelte:fragment>
</Navbar>

<div class="container mx-auto px-4 pb-10 mt-8">
	<h1 class="text-lg font-semibold">Hotkeys</h1>
	<p class="mb-4">
		Hotkeys are Keyboard shortcuts to do certain actions quickly. All actions here automatically
		apply the changes immediately.
	</p>

	{#each $hotkeyStore as config}
		<HotkeyConfigForm bind:config />
	{/each}

	<div class="mt-12">
		Reset all the shortcots to their defaults:
		<button on:click={reset} class="btn btn-ghost ml-2 text-red-400">Reset All Shortcuts</button>
	</div>
</div>
