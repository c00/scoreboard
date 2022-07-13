<script lang="ts">
	import Navbar from '$lib/Navbar/Navbar.svelte';
</script>

<Navbar>
	<div slot="links">
		<a href="/config" class="hover:text-white">Setup</a>
	</div>
</Navbar>

<div class="mx-auto bg-slate-50 h-full">
	<div class="container mx-auto pt-10 h-full">
		<h1 class="text-2xl">Scoreboard!</h1>
		<p>
			This is an experimental Scoreboard project. Set it up by clicking on the <a
				href="/config"
				class="btn btn-xs btn-primary">Setup</a
			>
			button.You can see the scoreboard by clicking the
			<a class="btn btn-xs btn-primary" href="/scoreboard">scoreboard</a> button.
		</p>

		<h2 class="text-xl mt-4">Instructions</h2>
		<ol class="list-decimal ml-4 mt-2">
			<li>Go to <a href="/config" class="hover:underline text-primary">setup</a>. Configure your scoreboard.</li>
			<li>Make the necessary setup, and click <span class="badge badge-accent">apply</span>.</li>
			<li>Go to the <a href="/config" class="hover:underline text-primary">Scoreboard</a>. See the results.</li>
			<li>You can make more changes to the configuration. They will be applied when clicking <span class="badge badge-accent">apply</span>.</li>
		</ol>

		<p class="pt-4 ">Note that the following are applied instantly (and don't require the apply button):</p>

		<ul class="list-disc ml-4 mt-2">
			<li>The Goal Buttons (They light up the Goal Arrow and play the horn sound).</li>
			<li>Images (They are updated instantly)</li>
			<li>Sounds (They are updated instantly)</li>
		</ul>

	</div>
</div>
