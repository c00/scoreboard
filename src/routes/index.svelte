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
			<li>
				Go to <a href="/config" class="hover:underline text-primary">setup</a>. Configure your
				scoreboard.
			</li>
			<li>Make the necessary setup, and click <span class="badge badge-accent">apply</span>.</li>
			<li>
				Go to the <a href="/config" class="hover:underline text-primary">Scoreboard</a>. See the
				results.
			</li>
			<li>
				You can make more changes to the configuration. They will be applied when clicking <span
					class="badge badge-accent">apply</span
				>.
			</li>
		</ol>

		<div class="alert border my-2">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					class="stroke-info flex-shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Press F11 to go fullscreen on the Scoreboard</span>
			</div>
		</div>

		<p class="pt-4 ">
			Note that the following are applied instantly (and don't require the apply button):
		</p>

		<ul class="list-disc ml-4 mt-2">
			<li>The Goal Buttons (They light up the Goal Arrow and play the horn sound).</li>
			<li>Images (They are updated instantly)</li>
			<li>Sounds (They are updated instantly)</li>
		</ul>
	</div>
</div>
