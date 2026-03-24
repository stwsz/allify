<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import CarouselUserItems from '$lib/components/profile/CarouselUserItems.svelte';
	import UserSelectedSavedAlbumModal from './UserSelectedSavedAlbumModal.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	let userSavedAlbums: any[] = [];
	let isLoading = true;

	let showSelectedAlbumModal = false;
	let selectedSavedAlbum: any = null;

	async function getUserSavedAlbums(): Promise<any[]> {
		try {
			const reqUserSavedAlbums = await fetch('/api/spotify/user-saved-albums');

			if (!reqUserSavedAlbums.ok) {
				throw new Error('Failed to fetch user saved albums');
			}

			const resUserSavedAlbums = await reqUserSavedAlbums.json();

			sessionStorage.setItem('spotify-user-saved-albums', JSON.stringify(resUserSavedAlbums));

			return resUserSavedAlbums;
		} catch (error) {
			return [];
		}
	}

	onMount(async () => {
		const userSavedAlbumsFromStorage = sessionStorage.getItem('spotify-user-saved-albums');

		if (userSavedAlbumsFromStorage) {
			const userSavedAlbumsFromStorageParsed = await JSON.parse(userSavedAlbumsFromStorage);

			userSavedAlbums = userSavedAlbumsFromStorageParsed;
		} else {
			userSavedAlbums = await getUserSavedAlbums();
		}

		isLoading = false;
	});
</script>

<section class="flex flex-col gap-4">
	<p class="text-xl font-medium text-t-primary sm:text-2xl">
		{$translationsStore.profilePage.profilePageUserSavedAlbumsSectionHeading2}
	</p>

	{#if isLoading === true}
		<div class="flex justify-center py-8">
			<DotsLoading />
		</div>
	{:else if userSavedAlbums.length > 0}
		<CarouselUserItems
			items={userSavedAlbums}
			itemsType="user-saved-albums"
			bind:selectedSavedAlbum
			bind:showSelectedSavedAlbumModal={showSelectedAlbumModal}
		/>
	{:else}
		<p>{$translationsStore.profilePage.profilePageUserSavedAlbumsSectionParagraph1}</p>
	{/if}
</section>

<UserSelectedSavedAlbumModal bind:album={selectedSavedAlbum} bind:showSelectedAlbumModal />
