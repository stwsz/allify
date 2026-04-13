<script lang="ts">
	// Components
	import CarouselUserItems from '$lib/components/profile/CarouselUserItems.svelte';
	import UserSelectedSavedAlbumModal from './UserSelectedSavedAlbumModal.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { AlbumSpotify } from '$lib/types/UserInfo.type';

	// Props
	export let userSavedAlbums: AlbumSpotify[];

	let showSelectedAlbumModal = false;
	let selectedSavedAlbum: AlbumSpotify | undefined = undefined;
</script>

<section class="flex flex-col gap-4">
	<p class="text-xl font-medium text-t-primary sm:text-2xl">
		{$translationsStore.profilePage.profilePageUserSavedAlbumsSectionHeading2}
	</p>

	{#if userSavedAlbums.length > 0}
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
