<script lang="ts">
	// Components
	import CarouselUserItems from '../CarouselUserItems.svelte';
	import UserSelectedPlaylistModal from './UserSelectedPlaylistModal.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { PlaylistSpotify } from '$lib/types/UserInfo.type';

	// Props
	export let userPlaylists: PlaylistSpotify[];

	let showSelectedPlaylistModal = false;
	let selectedPlaylist: PlaylistSpotify | undefined = undefined;
</script>

<section class="flex flex-col gap-4">
	<p class="text-xl font-medium text-t-primary sm:text-2xl">
		{$translationsStore.profilePage.profilePageUserPlaylistsSectionHeading2}
	</p>

	{#if userPlaylists.length > 0}
		<CarouselUserItems
			items={userPlaylists}
			itemsType="user-playlists"
			bind:selectedPlaylist
			bind:showSelectedPlaylistModal
		/>
	{:else}
		<p>{$translationsStore.profilePage.profilePageUserPlaylistsSectionParagraph1}</p>
	{/if}
</section>

<UserSelectedPlaylistModal bind:playlist={selectedPlaylist} bind:showSelectedPlaylistModal />
