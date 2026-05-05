<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
	import { toast } from '$lib/stores/toast.store';

	// Services
	import { updateLimitMostListenedTracks } from '$lib/services/user/updateLimitMostListenedTracks';
	import { updateLimitMostListenedArtists } from '$lib/services/user/updateLimitMostListenedArtists';

	// Props
	export let additionalItemsType: 'artists' | 'tracks';

	let loadingMoreItems = false;

	async function moreMyMusicalProfileItems() {
		if (($userInfo?.tickets ?? 0) === 0) {
			toast.set({
				showToast: true,
				toastType: 'warning',
				toastMessage:
					additionalItemsType === 'artists'
						? $translationsStore.myMusicalProfilePage
								.myMusicalProfilePageMostListenedShowMoreFiveArtistsButtonNoTicketsToastMessage
						: $translationsStore.myMusicalProfilePage
								.myMusicalProfilePageMostListenedShowMoreFiveTracksButtonNoTicketsToastMessage
			});

			return;
		}

		loadingMoreItems = true;

		if (additionalItemsType === 'artists') {
			if ($userInfo?.connectedStreamings.spotify?.mostListenedArtists?.limit) {
				const updateLimitMostListenedArtistsResult = await updateLimitMostListenedArtists(
					$userInfo?.email,
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.limit
				);

				if (updateLimitMostListenedArtistsResult?.loaded === true) {
					setTimeout(() => {
						loadingMoreItems = false;
					}, 1000);
				}
			} else {
				return;
			}
		} else if (additionalItemsType === 'tracks') {
			if ($userInfo?.connectedStreamings.spotify?.mostListenedTracks?.limit) {
				const updateLimitMostListenedTracksResult = await updateLimitMostListenedTracks(
					$userInfo?.email,
					$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.limit
				);

				if (updateLimitMostListenedTracksResult?.loaded === true) {
					setTimeout(() => {
						loadingMoreItems = false;
					}, 1000);
				}
			} else {
				return;
			}
		}
	}
</script>

<button
	class="mx-auto w-fit cursor-pointer rounded-lg bg-brand-primary px-8 py-4 text-sm font-medium text-t-inverse transition hover:opacity-90"
	onclick={moreMyMusicalProfileItems}
>
	<div
		class="flex w-full items-center justify-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left"
	>
		{#if !loadingMoreItems}
			<span class="text-sm font-medium">
				{#if additionalItemsType === 'artists'}
					{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageMostListenedShowMoreFiveArtistsButton}
				{:else if additionalItemsType === 'tracks'}
					{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageMostListenedShowMoreFiveTracksButton}
				{/if}
			</span>

			<div
				class="flex w-fit items-center gap-2 rounded-full bg-s-page px-3 py-1.5 text-brand-primary sm:px-3.5"
			>
				<img src={TicketIcon} alt={$translationsStore.generalTexts.ticketAltText} class="h-5 w-5" />

				<span class="text-sm font-semibold">-1</span>
			</div>
		{:else}
			<DotsLoading />
		{/if}
	</div>
</button>
