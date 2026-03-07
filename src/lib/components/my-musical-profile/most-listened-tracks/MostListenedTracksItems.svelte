<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import TopTrackItem from './TopTrackItem.svelte';
	import ExternalLink from '../../general/ExternalLinkSpotify.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	let mostListenedTracks: any[] = [];
	let isLoading = true;

	async function fetchMostListenedTracksItems() {
		try {
			const reqMostListenedItems = await fetch(`/api/spotify/most-listened-tracks`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ locale: $translationsStore.locale, limit: 5 })
			});

			if (!reqMostListenedItems.ok) return;

			const resMostListenedItems = await reqMostListenedItems.json();
			mostListenedTracks = resMostListenedItems;

			sessionStorage.setItem(`most-listened-tracks`, JSON.stringify(mostListenedTracks));
		} catch (error) {
			console.error('Error fetching most listened tracks:', error);
		} finally {
			isLoading = false;
		}
	}

	onMount(async () => {
		const cachedMostListenedTracks = sessionStorage.getItem(`most-listened-tracks`);

		if (cachedMostListenedTracks) {
			mostListenedTracks = JSON.parse(cachedMostListenedTracks);
			isLoading = false;
		} else {
			await fetchMostListenedTracksItems();
		}
	});
</script>

<div class="flex flex-col gap-10 lg:gap-14">
	<h2>{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracksHeading2}</h2>

	{#if isLoading}
		<div class="flex items-center justify-center py-10">
			<DotsLoading />
		</div>
	{:else if mostListenedTracks.length > 0}
		<div class="flex flex-col gap-16">
			{#each mostListenedTracks as track, i (track.id)}
				{#if i === 0}
					<TopTrackItem mostListenedTrackItem={track} index={i} />
				{:else}
					<div class="grid w-full grid-cols-[auto_1fr] gap-6 sm:grid-cols-[auto_1fr_auto]">
						<picture class="shrink-0">
							<img
								src={track.album.images[1]?.url}
								srcset="
				{track.album.images[2]?.url} 160w,
				{track.album.images[1]?.url} 320w,
				{track.album.images[0]?.url} 640w
			"
								sizes="96px"
								alt={track.name}
								class="h-20 w-20 rounded-lg object-cover shadow-md sm:h-36 sm:w-36 lg:h-42 lg:w-42"
								loading="lazy"
							/>
						</picture>

						<div class="flex min-w-0 flex-col gap-4">
							<div class="space-y-1.5">
								<p class="text-xs font-medium text-t-secondary">
									#{i + 1}
									{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracks}
								</p>

								<p class="text-2xl leading-tight font-semibold text-t-primary">
									{track.name}
								</p>

								<p class="truncate text-xs text-t-secondary">
									{track.artists.map((a: any) => a.name).join(', ')}
								</p>
							</div>

							<div class="flex flex-wrap gap-2">
								<span
									class="rounded-md bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
								>
									{track.album.name}
								</span>
							</div>
						</div>

						<div class="col-span-2 flex w-full flex-col gap-2 sm:col-span-1 sm:items-start md:w-70">
							<Popularity item={track} />

							<ExternalLink
								additionalClass="w-full mt-2"
								streamingPlatform="spotify"
								externalLink={track.external_urls.spotify}
								externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
							/>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>
