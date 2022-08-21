<script lang="ts">
	import { browser } from '$app/env';
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';
	import { gameState } from '../GameStores/gameStateStore';
	import { currentEvent, hotkeyStore } from './hotkeyStore';

	$: if ($hotkeyStore) setShortcuts();

	gameState;
	let currentShortCuts: string[] = [];

	onMount(() => {
		if (!browser) return;
		hotkeys.setScope('active');
		hotkeys.filter = () => true;

		return () => hotkeys.deleteScope('active');
	});

	const setShortcuts = () => {
		if (!browser) return;

		//Remove the old ones.
		currentShortCuts.forEach((s) => {
			hotkeys.unbind(s, 'active');
		});

		currentShortCuts = [];
		for (const s of $hotkeyStore) {
			currentShortCuts.push(s.shortcut);

			hotkeys(s.shortcut, 'active', (e) => {
				e.preventDefault();
				currentEvent.set(s.action);
			});
		}
	};

	//todo define the actions
</script>
