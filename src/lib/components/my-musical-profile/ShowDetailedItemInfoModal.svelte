<script lang="ts">
	// Components
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';
	import DetailedArtistInfoItem from './DetailedArtistInfoItem.svelte';
	import DetailedTrackInfoItem from './DetailedTrackInfoItem.svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { DetailedArtistItem, DetailedTrackItem } from '$lib/types/detailedItem.type';

	// Props
	export let choosedItemType: 'artist' | 'track' | 'album' | '';
	export let itemId: string;
	export let showDetailedInfoModalVisible: boolean;

	let lastItemId: string | null = null;
	let loading = false;

	let detailedArtistInfoItem: DetailedArtistItem | null = null;
	let detailedTrackInfoItem: DetailedTrackItem | null = null;

	async function getDetailedInfoItem() {
		loading = true;
		detailedArtistInfoItem = null;
		detailedTrackInfoItem = null;

		try {
			const res = await fetch(`/api/spotify/${choosedItemType}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ itemId })
			}).then((r) => r.json());

			if (choosedItemType === 'artist') detailedArtistInfoItem = res;
			else if (choosedItemType === 'track') detailedTrackInfoItem = res;
		} catch (error) {
			console.error('Error fetching detailed info item:', error);
		} finally {
			loading = false;
		}
	}

	$: if (showDetailedInfoModalVisible && itemId && itemId !== lastItemId) {
		lastItemId = itemId;
		getDetailedInfoItem();
	}
</script>

{#if showDetailedInfoModalVisible}
	<div class="fixed inset-0 z-40 flex items-center justify-center bg-s-inverse/40 p-4">
		<div
			class="
                relative
                z-50
                max-h-[90dvh]
                w-full
                max-w-3xl
                overflow-y-auto
                rounded-xl
                bg-s-default
                p-6
                shadow-lg
                sm:p-8
            "
			role="dialog"
			aria-modal="true"
		>
			<button
				aria-label={$translationsStore.generalTexts.closeMenuAltText}
				on:click={() => (showDetailedInfoModalVisible = false)}
				class="
                absolute
                top-3
                right-3
                cursor-pointer
                rounded-md
                p-1
                transition-all
                hover:bg-s-muted
                focus:ring-2
                focus:ring-brand-primary
                focus:outline-none
                "
			>
				<CloseIcon
					iconSvgClass="w-6 h-6 text-brand-primary"
					iconAltText={$translationsStore.generalTexts.closeMenuAltText}
				/>
			</button>

			{#if loading}
				<div class="flex h-32 items-center justify-center">
					<DotsLoading streamingPlatform="spotify" />
				</div>
			{:else if choosedItemType === 'artist' && detailedArtistInfoItem !== null}
				<DetailedArtistInfoItem {detailedArtistInfoItem} />
			{:else if choosedItemType === 'track' && detailedTrackInfoItem !== null}
				<DetailedTrackInfoItem {detailedTrackInfoItem} />
			{/if}
		</div>
	</div>
{/if}
