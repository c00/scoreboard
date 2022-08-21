<script lang="ts">
	import { DateTime, Duration } from 'luxon';
	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
	import { time } from './timer';
	import { createEventDispatcher, getContext } from 'svelte';
	import { hasVal } from '../Config/ClockConfig/ClockHelper';
	import type { Readable } from 'svelte/store';
	import { browser } from '$app/env';
	import localforage from 'localforage';
	import { currentEvent, HotkeyAction } from '$lib/hotkeys/hotkeyStore';

	export let audioLabel: string = null;
	export let seconds = 600;
	export let active = true;
	export let stopAtZero = true;

	export let color = 'green';
	export let format = '  :  ';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const dispatch = createEventDispatcher();
	const mediaUpdate = getContext<Readable<string>>('media-update');

	let ms = 0;
	let value: string;
	let endTime: DateTime;
	let audioEl: HTMLAudioElement;
	let audioSrc: string;
	let buzzed = false;

	$: hasVal(seconds) ? initClock() : clearClock();
	$: active ? resume() : pause();
	$: if (active && $time) tick();
	$: if (browser && $mediaUpdate && audioEl) loadAudio();
	$: if ($currentEvent === HotkeyAction.BUZZER) soundBuzzer();

	async function loadAudio() {
		audioSrc = await localforage.getItem(audioLabel);
	}

	function soundBuzzer() {
		if (audioLabel !== 'buzzer') return;
		if (audioEl && audioSrc) audioEl.play();
	}

	function clearClock() {
		active = false;
		value = null;
	}

	function initClock() {
		buzzed = false;
		ms = seconds * 1000;
		setValue();
		endTime = DateTime.now().plus({ seconds });
	}

	function tick() {
		ms = endTime.diffNow().toMillis();
		if (ms <= 0 && stopAtZero) {
			ms = 0;
			active = false;
			dispatch('timerFinished');
			if (!buzzed && audioEl && audioSrc) {
				buzzed = true;
				audioEl.play();
			}
		}
		setValue();
	}

	function pause() {
		endTime = null;
	}

	function resume() {
		endTime = DateTime.now().plus({ milliseconds: ms });
		setValue();
	}

	function setValue() {
		const absMs = Math.abs(ms);
		if (ms > 60 * 1000) {
			//Minutes and seconds
			value = Duration.fromMillis(absMs).toFormat('mm:ss');
		} else {
			//Show seconds and hundreths
			const hundreths = absMs / 10;
			const msPart = String(Math.floor(hundreths % 100)).padStart(2, '0');
			value = `${Duration.fromMillis(absMs).toFormat('ss')}:${msPart}`;
		}
	}
</script>

<SegmentDisplay {color} {format} {value} {size} animate={ms > 60 * 1000} />
<audio src={audioSrc} bind:this={audioEl} />
