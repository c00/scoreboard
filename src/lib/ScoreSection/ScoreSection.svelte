<script lang="ts">
	import type { TeamState } from '../GameStores/GameState';
	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
	import hockey from '$lib/assets/hockey.png';
	import { browser } from '$app/env';
	import localforage from 'localforage';

	export let team: TeamState;

	let src: string = hockey;

	$: if (team && browser) setDataUrl();

	async function setDataUrl() {
		const data = await localforage.getItem<string>(`team-${team.side}`);
		if (data) src = data;
	}

	// export let image: string;
	// export let name: string;
	// export let score: number;
</script>

<div class="text-center">
	<div><img {src} alt="Team logo" class="aspect-square w-28 mx-auto" /></div>
	<div class="mt-2 mb-1 text-4xl underline">{team.name}</div>
	<div class="mt-4">
		<SegmentDisplay format="  " value={team.score} />
	</div>
</div>
