<script lang="ts">
	import hotkeys from 'hotkeys-js';

	import type { HotkeyConfig } from './hotkeyStore';
	import { actionNames } from './hotkeyStore';

	export let config: HotkeyConfig;

	let setting = false;
	let keyState: KeyboardEvent;
	let keyText = 'Press keys';

	function setText() {
		const text = [];
		if (keyState.ctrlKey) text.push('ctrl');
		if (keyState.altKey) text.push('alt');
		if (keyState.shiftKey) text.push('shift');
		if (keyState.key.length === 1) text.push(keyState.key);
		keyText = text.join('+');
	}

	//Listen for keyboard press
	function startListen() {
		//Already listening to someone else?
		if (hotkeys.getScope() === 'listening') return;

		hotkeys.setScope('listening');
		setting = true;
	}

	function stopListen() {
		keyState = undefined;
		keyText = 'Press keys';
		setting = false;
		hotkeys.setScope('active');
	}

	function confirm() {
		config.shortcut = keyText;
		console.log('confirming', keyText);
		stopListen();
	}

	function resetShortcut() {
		config.shortcut = '';
	}

	function handleKeypress(e: KeyboardEvent) {
		if (!setting) return;

		if (e.code === 'Escape') {
			stopListen();
			return;
		}

		e.preventDefault();
		keyState = e;
		setText();

		if (e.key.length === 1 && keyText.length > 1) {
			confirm();
		}
	}
</script>

<svelte:window on:keydown={handleKeypress} />

<div class="flex gap-4 items-baseline mb-2">
	<div class="w-80" class:active={setting}>
		{actionNames[config.action]}
	</div>
	<div class="w-40">
		{#if setting}
			{keyText}
		{:else if config.shortcut}
			{config.shortcut}
		{:else}
			<i>Not set</i>
		{/if}
	</div>
	<div>
		<button class="btn btn-ghost mr-3" on:click={startListen}>set</button>
		{#if config.shortcut}
			<button class="btn btn-ghost" on:click={resetShortcut}>clear</button>
		{/if}
	</div>
</div>

<style>
	.active {
		@apply text-red-500;
	}
</style>
