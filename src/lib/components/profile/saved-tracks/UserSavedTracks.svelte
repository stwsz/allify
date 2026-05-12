<script lang="ts">
	// Components
	import CarouselUserItems from '../CarouselUserItems.svelte';
	import UserSelectedSavedTrackModal from './UserSelectedSavedTrackModal.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { LikedTrackSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let likedTracks: LikedTrackSpotify[] = [];

	let showSelectedSavedTrackModal = false;
	let selectedSavedTrack: LikedTrackSpotify | undefined = undefined;
</script>

<section class="flex flex-col gap-4">
	<p class="text-xl font-medium text-t-primary sm:text-2xl">
		{$translationsStore.profilePage.profilePageUserSavedTracksSectionHeading2}
	</p>

	{#if likedTracks && likedTracks.length > 0}
		<CarouselUserItems
			items={likedTracks}
			itemsType="user-saved-tracks"
			bind:selectedSavedTrack
			bind:showSelectedSavedTrackModal
		/>
	{:else}
		<p class="my-2 text-sm">
			{$translationsStore.profilePage.profilePageUserSavedTracksSectionParagraph1}
		</p>
	{/if}
</section>

<UserSelectedSavedTrackModal bind:showSelectedSavedTrackModal bind:selectedSavedTrack />
