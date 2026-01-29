<script lang="ts">
	// Components
	import ExternalLink from '$lib/components/my-musical-profile/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	export let detailedTrackInfoItem: any;
</script>

<div class="flex flex-col gap-6">
	<div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
		<img
			src={detailedTrackInfoItem?.album?.images?.[1]?.url}
			alt={detailedTrackInfoItem?.name}
			class="h-40 w-40 rounded-xl object-cover shadow-lg sm:h-48 sm:w-48"
			loading="lazy"
		/>

		<div class="flex flex-col gap-2 text-center sm:text-left">
			<h4 class="text-2xl font-bold text-t-primary sm:text-3xl">
				{detailedTrackInfoItem?.name}
			</h4>

			<p class="text-base font-medium text-t-secondary">
				{#each detailedTrackInfoItem?.artists ?? [] as artist, i}
					<span
						>{artist.name}{i < (detailedTrackInfoItem?.artists?.length ?? 0) - 1 ? ', ' : ''}</span
					>
				{/each}
			</p>

			<div class="flex flex-col gap-1 text-sm text-t-secondary">
				<span class="font-medium">{detailedTrackInfoItem?.album?.name}</span>
				<span class="text-xs text-t-secondary/70">
					{detailedTrackInfoItem?.album?.release_date}
				</span>
			</div>

			<div class="mt-2 flex items-center gap-2">
				<span class="text-sm text-t-secondary"
					>{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageDetailedTracksInfoModalPopularity}</span
				>
				<div class="h-2 w-32 overflow-hidden rounded-full bg-s-muted">
					<div
						class="h-full bg-brand-primary"
						style="width: {detailedTrackInfoItem?.popularity || 0}%"
					></div>
				</div>
				<span class="text-sm font-medium text-t-primary">
					{detailedTrackInfoItem?.popularity}%
				</span>
			</div>
		</div>
	</div>

	<ExternalLink
		streamingPlatform="spotify"
		externalLink={detailedTrackInfoItem?.external_urls?.spotify}
		externalLinkText={$translationsStore.myMusicalProfilePage
			.myMusicalProfilePageDetailedItemInfoModalExternalLinkTrackText}
	/>
</div>
