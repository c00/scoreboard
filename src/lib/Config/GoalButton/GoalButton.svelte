<script lang="ts">
	import { currentEvent, HotkeyAction } from '../../hotkeys/hotkeyStore';
import { addToast } from '../../Toasts/ToastStore';

	export let label = 'GOAL';
	export let value: boolean;
	export let side: 'left' | 'right';

	export let timeout = 20000;
	export let useTimeout = true;

	let timeoutId: ReturnType<typeof setTimeout>;

	$: if ($currentEvent) checkEvent();

	function checkEvent() {
		if ($currentEvent === HotkeyAction.GOAL_LEFT && side === 'left') {
			click();
			$currentEvent = null;
			addToast('Goal shown (Left)')
		} else if ($currentEvent === HotkeyAction.GOAL_RIGHT && side === 'right') {
			click();
			$currentEvent = null;
			addToast('Goal shown (Right)')
		}
	}

	function click() {
		if (value === true) {
			clearTimeout(timeoutId);
			value = false;
			return;
		}

		value = true;

		if (useTimeout) {
			timeoutId = setTimeout(() => {
				value = false;
			}, timeout);
		}
	}
</script>

<button class="btn btn-block btn-accent" type="button" on:click={click}>{label}</button>
