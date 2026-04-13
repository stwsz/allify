<script lang="ts">
	// Components
	import CarouselUserItems from '$lib/components/profile/CarouselUserItems.svelte';
	import UserSelectedSavedAlbumModal from './UserSelectedSavedAlbumModal.svelte';

	// Types
	import type { AlbumSpotify } from '$lib/types/UserInfo.type';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	let showSelectedAlbumModal = false;
	let selectedSavedAlbum: AlbumSpotify | undefined = undefined;

	let userSavedAlbums: AlbumSpotify[] = $userInfo?.connectedStreamings.spotify?.albums?.albumItems|| [];
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
