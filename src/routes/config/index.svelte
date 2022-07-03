<script lang="ts">
	import { defaultState, gameState, STORAGE_KEY } from '$lib/GameStores/GameState';
import { onMount } from 'svelte';

  $: if ($gameState) updateStorage();

  onMount(() => {
    if (!$gameState) {
      //try loading it from storage
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        gameState.set(defaultState);
      } else {
        const state = JSON.parse(data);
        gameState.set(state);
      }
    }
  })

  const updateStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify($gameState));
  }
</script>

<button on:click={() => $gameState.period++}>NEXT PERIOD</button>

<button on:click={() => $gameState = defaultState }>RESET</button>

<pre>{$gameState?.period}</pre>
