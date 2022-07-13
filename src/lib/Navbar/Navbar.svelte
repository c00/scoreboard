<script lang="ts">
	import { fade } from 'svelte/transition';
	import GithubIcon from './GithubIcon.svelte';

	let counter = 0;
	let showHiddenMessage = false;
	$: if (counter === 10) {
		showHiddenMessage = true;
		setTimeout(() => {
			showHiddenMessage = false;
			counter = 0;
		}, 5000);
	}
</script>

<div class="navbar bg-primary text-primary-content">
	<div class="flex-1">
		<button type="button" on:click={() => counter++} class="btn btn-ghost normal-case text-xl"
			>Scoreboard</button
		>
		{#if showHiddenMessage}
			<span class="ml-4" transition:fade>Stop touching me!</span>
		{/if}
	</div>
	<div class="flex-none mr-4">
		<slot name="links">
			<a href="/scoreboard" class="hover:text-white" target="_blank">open scoreboard</a>
		</slot>
	</div>
	<div class="flex-none mr-4">
		<a href="https://github.com/c00/scoreboard" target="_blank" class="hover:text-white transition-colors" title="GitHub Repo">
			<GithubIcon />
		</a>
	</div>
</div>
