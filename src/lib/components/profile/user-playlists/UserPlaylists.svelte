<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import CarouselUserItems from '../CarouselUserItems.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	let userPlaylists: any[] = [];
	let isLoading = true;

	async function getUserPlaylists(): Promise<any[]> {
		try {
			const reqUserPlaylists = await fetch('/api/spotify/user-playlists');

			if (!reqUserPlaylists.ok) {
				throw new Error('Failed to fetch saved playlists');
			}

			const resUserPlaylists = await reqUserPlaylists.json();

			sessionStorage.setItem('user-playlists', JSON.stringify(resUserPlaylists));

			return resUserPlaylists.items;
		} catch (error) {
			return [];
		}
	}

	onMount(async () => {
		const userPlaylistsFromStorage = sessionStorage.getItem('user-playlists');

		if (userPlaylistsFromStorage) {
			const userPlaylistsFromStorageParsed = await JSON.parse(userPlaylistsFromStorage);

			userPlaylists = userPlaylistsFromStorageParsed.items;
		} else {
			userPlaylists = await getUserPlaylists();
		}

		isLoading = false;
	});
</script>

<section class="flex flex-col gap-4">
	<p class="text-xl font-medium text-t-primary sm:text-2xl">
		{$translationsStore.profilePage.profilePageUserPlaylistsSectionHeading2}
	</p>

	{#if isLoading === true}
		<div class="flex justify-center py-8">
			<DotsLoading />
		</div>
	{:else if userPlaylists.length > 0}
		<CarouselUserItems items={userPlaylists} itemsType="user-playlists" />
	{:else}
		<p>{$translationsStore.profilePage.profilePageUserPlaylistsSectionParagraph1}</p>
	{/if}
</section>
