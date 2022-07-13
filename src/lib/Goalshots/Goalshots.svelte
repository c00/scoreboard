<script lang="ts">
import { browser } from '$app/env';
import localforage from 'localforage';

import { getContext } from 'svelte';
import type { Readable } from 'svelte/store';

	import SegmentDisplay from '../SegmentsDisplay/SegmentDisplay.svelte';
	export let logo: string;
	export let leftValue: number;
	export let rightValue: number;

	const mediaUpdate = getContext<Readable<string>>('media-update');

	$: if (browser && $mediaUpdate) setDataUrl();

	async function setDataUrl() {
		const data = await localforage.getItem<string>('main-logo');
		if (data) logo = data;
	}
</script>

<div class="flex justify-center">
	<div>
		<SegmentDisplay size="sm" format="  " color="orange" value={leftValue} />
	</div>
	<div>
		<img class="w-24 p-4" src={logo} alt="Scoreboard Logo" />
	</div>
	<div>
		<SegmentDisplay size="sm" format="  " color="orange" value={rightValue} />
	</div>
</div>
<div class="text-3xl">SHOTS ON GOAL</div>
