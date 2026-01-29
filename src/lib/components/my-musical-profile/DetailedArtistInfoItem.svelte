<script lang="ts">
	// Components
	import ExternalLink from '$lib/components/my-musical-profile/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	export let detailedArtistInfoItem: any;
</script>

<div class="flex flex-col gap-6">
	<div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
		<img
			src={detailedArtistInfoItem?.images?.[1]?.url}
			alt={detailedArtistInfoItem?.name}
			class="h-40 w-40 rounded-xl object-cover shadow-lg sm:h-48 sm:w-48"
			loading="lazy"
		/>

		<div class="flex flex-col gap-2 text-center sm:text-left">
			<h4 class="text-2xl font-bold text-t-primary sm:text-3xl">
				{detailedArtistInfoItem?.name}
			</h4>

			<p class="text-base text-t-secondary">
				{detailedArtistInfoItem?.followers?.total?.toLocaleString()}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtistsFollowers}
			</p>

			<div class="flex items-center justify-center gap-2 sm:justify-start">
				<span class="text-sm text-t-secondary"
					>{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageDetailedArtistInfoModalPopularity}</span
				>
				<div class="h-2 w-32 overflow-hidden rounded-full bg-s-muted">
					<div
						class="h-full bg-brand-primary"
						style="width: {detailedArtistInfoItem?.popularity || 0}%"
					></div>
				</div>
				<span class="text-sm font-medium text-t-primary">
					{detailedArtistInfoItem?.popularity}%
				</span>
			</div>

			{#if detailedArtistInfoItem?.genres?.length}
				<div class="mt-2.5">
					<h5 class="mb-2 text-sm font-semibold tracking-wide text-t-secondary uppercase">
						{$translationsStore.myMusicalProfilePage
							.myMusicalProfilePageDetailedArtistInfoModalGenre}
					</h5>

					<div class="flex flex-wrap justify-center gap-2 sm:justify-start">
						{#each detailedArtistInfoItem.genres as genre}
							<span
								class="rounded-md bg-brand-primary px-3 py-1 text-xs font-medium text-t-inverse"
							>
								{genre}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<ExternalLink
		streamingPlatform="spotify"
		externalLink={detailedArtistInfoItem?.external_urls?.spotify}
		externalLinkText={$translationsStore.myMusicalProfilePage
			.myMusicalProfilePageDetailedItemInfoModalExternalLinkArtistText}
	/>
</div>
