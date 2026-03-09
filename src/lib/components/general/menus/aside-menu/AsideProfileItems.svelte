<script lang="ts">
	// Svelte
	import { goto } from '$app/navigation';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { loadingAfterConnectionStore } from '$lib/stores/loadingAfterConnection.store';
	import { meStore } from '$lib/stores/me.store';

	// Props
	export let loggedIn: boolean;
	export let isAsideMenuOpen: boolean;

	$: notLoggedItems = [
		{
			streaming: 'spotify',
			text: $translationsStore.generalTexts.profileNotLoggedItem1,
			href: '/api/spotify/auth/login'
		},
		{
			streaming: 'deezer',
			text: $translationsStore.generalTexts.profileNotLoggedItem2,
			href: '/'
		}
	];

	$: loggedItems = [
		{
			text: $translationsStore.generalTexts.profileLoggedItem1,
			href: '/profile'
		},
		{
			text: $translationsStore.generalTexts.profileLoggedItem2,
			href: '/'
		}
	];
</script>

<ul class="space-y-1">
	{#if loggedIn}
		{#each loggedItems as item}
			<li class="rounded-lg transition-all hover:bg-s-muted">
				<button
					on:click={() => {
						goto(item.href);

						isAsideMenuOpen = false;
					}}
					class="flex w-full cursor-pointer items-center px-3 py-2 text-xs text-t-primary transition-all hover:translate-x-0.5"
				>
					{item.text}
				</button>
			</li>
		{/each}
	{:else}
		{#each notLoggedItems as item}
			<li class="rounded-lg transition-all hover:bg-s-muted">
				<button
					on:click={(e) => {
						if ($meStore !== undefined) {
							e.preventDefault();
						}

						loadingAfterConnectionStore.set({
							loading: true,
							streamingPlatform: item.streaming as 'spotify' | 'deezer'
						});

						window.location.href = item.href;
					}}
					class="flex w-full cursor-pointer items-center px-3 py-2 text-left text-xs text-t-primary transition-all hover:translate-x-0.5"
				>
					{@html item.text}
				</button>
			</li>
		{/each}
	{/if}
</ul>
