<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import CarouselUserItems from '../CarouselUserItems.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	let userSavedTracks: any[] = [];
	let isLoading = true;

	async function getSavedTracks(): Promise<any[]> {
		try {
			const reqUserSavedTracks = await fetch('/api/spotify/user-saved-tracks');

			if (!reqUserSavedTracks.ok) {
				throw new Error('Failed to fetch saved tracks');
			}

			const resUserSavedTracks = await reqUserSavedTracks.json();

			sessionStorage.setItem('user-saved-tracks', JSON.stringify(resUserSavedTracks));

			return resUserSavedTracks;
		} catch (error) {
			return [];
		}
	}

	onMount(async () => {
		const userSavedTracksFromStorage = sessionStorage.getItem('user-saved-tracks');

		if (userSavedTracksFromStorage) {
			const userSavedTracksFromStorageParsed = await JSON.parse(userSavedTracksFromStorage);

			userSavedTracks = userSavedTracksFromStorageParsed;
		} else {
			userSavedTracks = await getSavedTracks();
		}

		isLoading = false;
	});
</script>

<section class="flex flex-col gap-4">
	<p class="text-xl font-medium text-t-primary sm:text-2xl">
		{$translationsStore.profilePage.profilePageUserSavedTracksSectionHeading2}
	</p>

	{#if isLoading === true}
		<div class="flex justify-center py-8">
			<DotsLoading />
		</div>
	{:else if userSavedTracks.length > 0}
		<CarouselUserItems items={userSavedTracks} itemsType="user-saved-tracks" />
	{:else}
		<p>{$translationsStore.profilePage.profilePageUserSavedTracksSectionParagraph1}</p>
	{/if}
</section>
